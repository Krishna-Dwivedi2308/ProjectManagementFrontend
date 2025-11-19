// import React, { useEffect, useState } from 'react'

// import {
//   Card,
//   CardAction,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Input } from './ui/input'
// import { Button } from './ui/button'
// import { BeatLoader } from 'react-spinners'
// // import Error from './Error'
// import * as Yup from 'yup'
// import { fnlogin } from '@/services/apiAuth'
// // import Usefetch from '@/hooks/Usefetch'
// // import { login } from '@/db/apiAuth'
// import { Link, useNavigate } from 'react-router'
// import ResendVerificationEmail from './ResendVerificationDialog'
// import ResendVerificationDialog from './ResendVerificationDialog'
// // import { useSearchParams } from 'react-router-dom'
// // import { UrlState } from '@/Context'
// const Login = () => {
//   const navigate = useNavigate()
//   const [formData, setformData] = useState({
//     'email': '',
//     'username': '',
//     'password': ''
//   })
//   const [errors, setErrors] = useState({})
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')
//   const [openDialog, setOpenDialog] = useState(false);

//   const loginTrigger = async () => {
//     try {
//       setLoading(true);
//       const data = await fnlogin(formData);
//       navigate("/dashboard");
//     } catch (error) {
//       setError(error.message || "Login failed");
//       console.log(error);

//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleInput = (e) => {
//     const { name, value } = e.target
//     setformData((prev) => ({
//       ...prev, [name]: value
//     }))
//   }

//   const handleLogin = async () => {
//     setErrors({});
//     try {
//       const schema = Yup.object().shape({
//         email: Yup.string().email("Invalid Email"),
//         username: Yup.string(),
//         password: Yup.string()
//           .min(6, "Password must be at least 6 char long")
//           .required("Password is required"),
//       });

//       await schema.validate(formData, { abortEarly: false });
//       await loginTrigger();
//     } catch (error) {
//       const newErrors = {};
//       error?.inner?.forEach((err) => {
//         newErrors[err.path] = err.message;
//       });
//       setErrors(newErrors);
//     }
//   };
//   return (
//     <>
//       <ResendVerificationDialog
//         open={openDialog}
//         onOpenChange={setOpenDialog}
//       />
//       <Card>
//         <CardHeader>
//           <CardTitle>Login</CardTitle>
//           <CardDescription>Enter the email and password to login</CardDescription>
//           {error && <p className="text-red-500">{error}</p>}
//         </CardHeader>
//         <CardContent className="space-y-2">
//           <div className="space-y-1">
//             <Input
//               type="email"
//               name="email"
//               placeholder="Enter your registered email"
//               value={formData.email}
//               onChange={handleInput}
//             />
//             {errors.email && <p className="text-red-500">{errors.email}</p>}
//           </div>
//           <div className="space-y-1">
//             <Input
//               type="text"
//               name="username"
//               placeholder="Enter your registered username"
//               value={formData.username}
//               onChange={handleInput}
//             />
//             {errors.username && <p className="text-red-500">{errors.username}</p>}
//           </div>
//           <div className="space-y-1">
//             <Input
//               type="password"
//               name="password"
//               placeholder="Enter your password"
//               value={formData.password}
//               onChange={handleInput}
//             />
//             {errors.password && <p className="text-red-500">{errors.password}</p>}
//           </div>
//         </CardContent>

//         <CardFooter>
//           <Button
//           className='mb-3 w-full'
//           onClick={handleLogin}
//           type='submit'
//           disabled={loading}
//           >
//             {loading ? <BeatLoader size={10} color='#000000' /> : 'Login'}
//           </Button>

//           {/* <Link to="/signup">Forgot Password </Link> */}
//           <Button
//           className='mb-3 w-full'
//           variant="outline"
//           onClick={() => setOpenDialog(true)}
//           >
//             Resend Verification Email
//           </Button>      {/* <Link to="/signup">Resend Verification Email </Link> */}
//           <Button
//           variant="outline"
//           onClick={() => setOpenDialog(true)}
//           >
//             Forgot Password
//           </Button>      {/* <Link to="/signup">Resend Verification Email </Link> */}
//         </CardFooter>
//       </Card>
//     </>
//   )
// }

// export default Login

import React, { useEffect, useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Input } from './ui/input';
import { Button } from './ui/button';
import { BeatLoader } from 'react-spinners';
import * as Yup from 'yup';
import { fnlogin } from '@/services/apiAuth';
import { useNavigate } from 'react-router';
import ResendVerificationDialog from './ResendVerificationDialog';
import PasswordResetDialog from './PasswordResetDialog';
const Login = () => {
  const navigate = useNavigate();

  const [formData, setformData] = useState({
    email: '',
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openPasswordResetDialog, setOpenPasswordResetDialog] = useState(false);

  const loginTrigger = async () => {
    try {
      setLoading(true);
      await fnlogin(formData);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message || 'Login failed');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInput = e => {
    const { name, value } = e.target;
    setformData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    setErrors({});
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email('Invalid Email'),
        username: Yup.string(),
        password: Yup.string()
          .min(6, 'Password must be at least 6 char long')
          .required('Password is required'),
      });

      await schema.validate(formData, { abortEarly: false });
      await loginTrigger();
    } catch (error) {
      const newErrors = {};
      error?.inner?.forEach(err => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <>
      {/* Dialog */}
      <ResendVerificationDialog open={openDialog} onOpenChange={setOpenDialog} />
      <PasswordResetDialog
        open={openPasswordResetDialog}
        onOpenChange={setOpenPasswordResetDialog}
      />
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter the email and password to login</CardDescription>
          {error && <p className="text-red-500">{error}</p>}
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Input
              type="email"
              name="email"
              placeholder="Enter your registered email"
              value={formData.email}
              onChange={handleInput}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          <div className="space-y-1">
            <Input
              type="text"
              name="username"
              placeholder="Enter your registered username"
              value={formData.username}
              onChange={handleInput}
            />
            {errors.username && <p className="text-red-500">{errors.username}</p>}
          </div>

          <div className="space-y-1">
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInput}
            />
            {errors.password && <p className="text-red-500">{errors.password}</p>}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col w-full space-y-3">
          {/* Login Button */}
          <Button className="w-full" onClick={handleLogin} type="submit" disabled={loading}>
            {loading ? <BeatLoader size={10} color="#000000" /> : 'Login'}
          </Button>

          {/* Resend Verification Email */}
          <Button className="w-full" variant="outline" onClick={() => setOpenDialog(true)}>
            Resend Verification Email
          </Button>

          {/* Forgot Password */}
          <Button
            className="w-full"
            variant="outline"
            onClick={() => setOpenPasswordResetDialog(true)}
          >
            Forgot Password
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default Login;
