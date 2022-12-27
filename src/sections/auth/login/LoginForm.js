import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Button, Checkbox } from '@mui/material';
import Alert from '@mui/material/Alert';
// components
// import Iconify from '../../../components/Iconify';
// import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import { loginAuth } from '../../../redux/login/authSlice';
// import Button from 'src/theme/overrides/Button';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, success } = useSelector((state) => state.login);
  // console.log(error, 'login error')
  const [emailAuth, setEmailAuth] = useState('');
  const [pwdAuth, setPwdAuth] = useState('');
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false)
  const [errorContent, setErrotContent] = useState('')

  const { handleSubmit, control } = useForm();

  // const LoginSchema = Yup.object().shape({
  //   email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  //   password: Yup.string().required('Password is required'),
  // });

  // const defaultValues = {
  //   email: emailAuth,
  //   password: pwdAuth,
  //   remember,
  // };

  // const methods = useForm({
  //   resolver: yupResolver(LoginSchema),
  //   defaultValues,
  // });

  // const data = {
  //   email: emailAuth,
  //   password: pwdAuth,
  // };

  // const submitForm = (e) => {
  //   e.preventDefault();
  //   console.log(data);
    // dispatch(loginAuth(data))
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
  // };
  
  const onSubmit = data => {
    console.log(data);
    dispatch(loginAuth(data))
    // const token = localStorage.getItem('token')
      // .then((res) => console.log(res))
      // .catch((err) => console.log(err));
  };
   
  useEffect(() => {
    if (success) {
      navigate('/dashboard/user', { replace: true })
    } 
    if(error === 400) {
      console.log('400 Error')
      setShowError(true)
      setErrotContent("Please check your credentials.")
    }
  },[success])

  return (
    // <FormProvider methods={methods} onSubmit={submitForm}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {showError && <Alert severity="error">{errorContent}</Alert>}
        {/* <TextField
          // id="outlined-basic"
          required
          label="Email"
          type="email"
          variant="outlined"
          value={emailAuth}
          onChange={(e) => setEmailAuth(e.target.value)}
        /> */}
     <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Email"
            variant="outlined"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            type="email"
          />
        )}
        rules={{ required: 'Email required' }}
      />
       <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Password"
            variant="outlined"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            type="password"
          />
        )}
        rules={{ required: 'Password required' }}
      />
        {/* <TextField
          name="password"
          label="Password"
          required
          type={showPassword ? 'text' : 'password'}
          value={pwdAuth}
          onChange={(e) => setPwdAuth(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        /> */}
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <Button fullWidth size="large" type="submit" variant="contained">
        Login
      </Button>
      </form>
  )
}
