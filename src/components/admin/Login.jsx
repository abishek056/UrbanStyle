import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, Eye, EyeOff, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Login = ({ isOpen, onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (login(username, password)) {
            onClose();
        } else {
            setError('Invalid username or password');
        }
    };

    if (!isOpen) return null;

  }

export default Login;
