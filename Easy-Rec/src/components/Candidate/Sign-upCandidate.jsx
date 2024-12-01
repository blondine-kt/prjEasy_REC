
import styles from '../../assets/styles/SignupCandidate.module.scss';

    import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { useAuth } from '../../context/userAuth';
    import { getAuth, createUserWithEmailAndPassword } from '../../utils/firebase.utils';
    import { db, doc, setDoc } from '../../utils/firebase.utils';
    import { storage, ref, uploadBytes, getDownloadURL } from '../../utils/firebase.utils';
    
    function SignupCandidate() {  
      const navigate = useNavigate();
      const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        profilePicture: null
      });
      const [error, setError] = useState('');
      const [loading, setLoading] = useState(false);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      };
    
      const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
          setFormData(prev => ({
            ...prev,
            profilePicture: file
          }));
        } else {
          setError('Please select a valid image file');
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
    
        try {
          // Create auth user
          const auth = getAuth();
          const { user } = await createUserWithEmailAndPassword(
            auth, 
            formData.email, 
            formData.password
          );
    
          // Handle profile picture upload
          let profilePictureUrl = '';
          if (formData.profilePicture) {

            const storageRef = ref(storage, `profilePictures/${user.uid}`);
            await uploadBytes(storageRef, formData.profilePicture);
            profilePictureUrl = await getDownloadURL(storageRef);
          }
    
          // Save user data to Firestore
         
          await setDoc(doc(db, 'candidates', user.uid), {
            uid: user.uid,
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            phoneNumber: formData.phoneNumber || '',
            profilePicture: profilePictureUrl,
            createdAt: new Date().toISOString()
          });
    
          // Navigate to dashboard
         // navigate('/candidate/dashboard');
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
    
      return (
        <div className={`${styles.candidateSignup} d-flex`}>
          <h2 className="text-2xl font-bold mb-6 text-center">Candidate Registration</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
    
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full p-2 border rounded"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
    
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                required
                minLength={6}
                className="w-full p-2 border rounded"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
    
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                required
                className="w-full p-2 border rounded"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
    
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                required
                className="w-full p-2 border rounded"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
    
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number (Optional)</label>
              <input
                type="tel"
                name="phoneNumber"
                className="w-full p-2 border rounded"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
    
            <div>
              <label className="block text-sm font-medium mb-1">Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 border rounded"
              />
            </div>
    
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              {loading ? 'Creating Account...' : 'Register'}
            </button>
          </form>
        </div>
      );
    };


export default SignupCandidate