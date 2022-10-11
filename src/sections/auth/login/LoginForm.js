import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import { loginAuth } from '../../../redux/login/authSlice';


// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  
  const { loading, userInfo, error } = useSelector((state) => state.login)
  // console.log(userInfo)
  const [emailAuth, setEmailAuth] = useState('')
  const [pwdAuth, setPwdAuth] = useState('')
  const [remember, setRemember] = useState(true)
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: emailAuth,
    password: pwdAuth,
    remember
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  // const {
  //   handleSubmit,
  //   formState: { isSubmitting },
  // } = methods;

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios({
  //     method: 'post',
  //     url: 'https://reqres.in/api/login',
  //     data: {
  //       email: emailAuth,
  //       password: pwdAuth
  //     }
  //   })
  //   .then((res) =>
  //     {
  //       console.log(res.data)
  //       localStorage.setItem('authToken', JSON.stringify(res.data.token)) 
  //       navigate('/dashboard', { replace: true })
  //     }
  //     )
  //     .catch((err) => {
  //       console.log(err)
  //       alert(err)
  //     })
  // };
  
  // const data = {
  //   email: emailAuth,
  //   password: pwdAuth
  // }

  const submitForm = (e) => {
    e.preventDefault();
    console.log(emailAuth, pwdAuth)
    dispatch(loginAuth(emailAuth, pwdAuth))
  }

  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard', { replace: true })
    }else {
      console.log('error')
    }
  }, [navigate, userInfo])

 

  return (
    <FormProvider methods={methods} onSubmit={submitForm}>
      <Stack spacing={3}>
        <TextField 
          id="outlined-basic" 
          label="Email" 
          variant="outlined"
          value={emailAuth}
          onChange = {(e) => setEmailAuth(e.target.value)}
          />
        
        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={pwdAuth}
          onChange = {(e) => setPwdAuth(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" >
        Login
      </LoadingButton>
    </FormProvider>
  );
}
