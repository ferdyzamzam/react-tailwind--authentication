// import { useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
export default function Dashboard() {
    const navigate = useNavigate();
    const auth = getAuth();
    // useEffect(() => {
    //     if (!auth.currentUser) {
    //       navigate('/'); // Jika tidak login, arahkan kembali ke halaman login
    //     }
    //   }, [auth.currentUser, navigate]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('userToken');

            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div className="mb-10">
            <div className="flex justify-center">
                <img alt="" className="h-14 w-14"
                    src="https://cdn-icons-png.flaticon.com/128/12333/12333176.png" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Welcome to Dashboard  <button className="font-medium text-purple-600 hover:text-purple-500" onClick={handleLogout}>Logout</button>
            </h2>

        </div>
    );
}