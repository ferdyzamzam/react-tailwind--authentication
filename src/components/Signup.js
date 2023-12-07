import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase';

const fields = signupFields;
let fieldsState = {};

fields.forEach(field => fieldsState[field.id] = '');

export default function Signup() {
    const [signupState, setSignupState] = useState(fieldsState);
    const navigate = useNavigate();
    const auth = getAuth();
    const firestore = getFirestore();

    const handleChange = (e) => setSignupState({ ...signupState, [e.target.id]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(signupState)
        createAccount()
    }
    const createAccount = async () => {
        try {
            const { 'email-address': email, password, username, 'confirm-password': confirmPassword } = signupState;

            console.log('Password:', password);
            console.log('Confirm Password:', confirmPassword);
            if (password !== confirmPassword) {
                window.alert('Password and confirm password do not match');
                return;
            }
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await updateProfile(user, {
                displayName: username,
            });
            const usersCollection = collection(firestore, 'users');
            await addDoc(usersCollection, {
                email: email,
                username: username,
                password: password,
            });

            navigate('/')
            window.alert('Account created successfully!');
        } catch (error) {
            console.error('Error creating account:', error);
            window.alert('Error creating account. Please try again.', error);
        }
    };



    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="">
                {
                    fields.map(field =>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                        />

                    )
                }
                <FormAction handleSubmit={handleSubmit} text="Signup" />
            </div>



        </form>
    )
}