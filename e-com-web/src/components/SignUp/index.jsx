import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../../ApiFunctions/index";
 
  
  const UserSignUp = () => {
    const history = useNavigate();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const adminSubmit = async (value) => {
      const res = await postRequest("/register", value);
      console.log("TRRr=>",res);
            const{_id} = res.data.res
      const{token} = res.data
      console.log("TRRr=>",_id);
      localStorage.setItem("token",token)
      localStorage.setItem("_id",_id)

        history("/")
     
    };
    return (

  <Container component="main" maxWidth="lg">
  <Box
    sx={{
      marginTop: 8,
    }}
  >
    <Grid container>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(adminSubmit)}
            sx={{ mt: 1 }}
          >
                <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="FirstName"
              name="firstName"
              autoComplete="firstName"
              autoFocus
              {...register("firstName", {
                required: {
                  value: true,
                  message: "FirstName is required",
                },
              })}
              
            />
              <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="LastName"
              name="lastName"
              autoComplete="lastName"
              autoFocus
              {...register("lastName", {
                required: {
                  value: true,
                  message: "lastName is required",
                },
              })}
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
              })}
              
            />
              <TextField
              margin="normal"
              required
              fullWidth
              id="mobile"
              label="Mobile Number Address"
              name="mobile"
              autoComplete="mobile"
              autoFocus
              {...register("mobile", {
                required: {
                  value: true,
                  message: "Mobile is required",
                },
              })}
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
              })}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Don't have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  </Box>
</Container>
    
    );
  };
  export default UserSignUp;


 
