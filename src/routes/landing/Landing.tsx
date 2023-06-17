import React from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Paper,
    AppBar,
    Toolbar,
} from '@mui/material';
import { alpha, styled } from '@mui/system';
import { keyframes } from '@mui/system';
import { Link as NavLink } from '../../common/Link.js';
import Logo from '/logo.svg';
import Grid from '@mui/material/Unstable_Grid2';
import Rating from '@mui/material/Rating';
import InputLabel from '@mui/material/InputLabel';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';
import InputBase from '@mui/material/InputBase';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ButtonStyled = styled(Button)(({ theme }) => ({
    fontSize: '1rem',
    fontWeight: 'bold',
    padding: theme.spacing(1, 4),
    borderRadius: theme.spacing(8),
}));

const AppBarStyled = styled(AppBar)(({ theme }) => ({
    background: theme.palette.background.default,
    height: '90px',
    justifyContent: 'center',
}));

const LogoImage = styled('img')(({ theme }) => ({
    height: '34px',
}));

const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'base-line',
    justifyContent: '',
}));

const HeadeLogo = styled('div')(({ theme }) => ({
    alignItems: 'center',
    borderRight: '1px solid rgba(29,30,28,7%)',
    color: '#fa5d00',
    display: 'flex',
    height: 'auto',
    marginRight: '25px',
    paddingBottom: '7px',
    paddingRight: '25px',
    paddingTop: '5px',
}));

const HomePageHero = styled(Container)(({ theme }) => ({
    position: 'relative',
    padding: '60px 20px 0 20px',
    borderBottom: '1px solid #fa5d00',
    '&:after': {
        backgroundImage: 'linear-gradient(transparent, #fff8f1)',
        bottom: 0,
        content: '""',
        display: 'block',
        height: '150px',
        position: 'absolute',
        width: '100%',
        // Other styles for the :after pseudo-element
    },
}));

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        position: 'relative',
        backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
        border: '1px solid',
        borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
        fontSize: 20,
        width: 'auto',
        padding: '10px 12px',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        borderRadius: '16px',
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            boxShadow: `${alpha(
                theme.palette.primary.main,
                0.25
            )} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}));

const FeaturesSection = styled(Container)(({ theme }) => ({
    padding: '96px 20px',
}));

const LandingPage = () => {
    const pages = [
        'Why Harvest?',
        ' Features',
        'Customers',
        ' Integrations',
        'Pricing',
    ];

    return (
        <>
            <AppBarStyled position="fixed" elevation={0}>
                <ToolbarStyled>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                            alignItems: 'center',
                        }}
                    >
                        <HeadeLogo>
                            <LogoImage src={Logo} />
                        </HeadeLogo>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                // onClick={handleCloseNavMenu}
                                sx={{
                                    my: 2,
                                    display: 'block',
                                    fontFamily: 'Montserrat Alternates',
                                }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                            justifyContent: '',
                            alignItems: 'Baseline',
                        }}
                    >
                        <Button>Sign In</Button>
                        <Button variant="contained">Register</Button>
                    </Box>
                </ToolbarStyled>
            </AppBarStyled>
            <Container fluid sx={{ padding: '90px 0 0' }}>
                <HomePageHero sx={{ padding: '0' }}>
                    <Grid container sx={{ justifyContent: 'center' }}>
                        <Grid
                            xs={12}
                            container
                            sx={{ justifyContent: 'center' }}
                        >
                            <Rating name="read-only" value={3} readOnly />
                        </Grid>
                        <Grid fluid xs={12}>
                            <Typography
                                gutterBottom
                                sx={{ fontSize: '75px', width: '100%' }}
                                align="center"
                            >
                                More than expense tracking
                            </Typography>
                        </Grid>
                        <Grid xs={12} container sx={{ padding: '0 46px' }}>
                            <Typography
                                gutterBottom
                                sx={{
                                    width: '100%',
                                    color: '#1D1E1C',
                                    fontSize: '27px',
                                    fontFamily: 'Roboto',
                                    fontWeight: '300',
                                }}
                                align="center"
                            >
                                Finally, an easy way to track time across
                                projects. Instant reports, seamless invoicing
                                and payments, and integrations with the tools
                                your team loves.
                            </Typography>
                        </Grid>
                        <Grid
                            xs={12}
                            container
                            sx={{
                                justifyContent: 'center',
                                padding: '30px 0',
                                alignItems: 'center',
                            }}
                        >
                            <Grid xs={3}>
                                <BootstrapInput
                                    defaultValue="Email"
                                    id="bootstrap-input"
                                />
                            </Grid>
                            <Grid xs={3}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        borderRadius: '16px',
                                        height: '50px',
                                    }}
                                >
                                    Get Started
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid xs={12} container sx={{ boder: '' }}>
                            <img
                                src={
                                    'https://www.getharvest.com/hubfs/raw_assets/public/harvest-theme/images/homepage/test/spread.png'
                                }
                                width={'100%'}
                            />
                        </Grid>
                    </Grid>
                </HomePageHero>
                <FeaturesSection>
                    <Grid container sx={{ justifyContent: 'center' }}>
                        <Grid fluid xs={12}>
                            <Typography
                                gutterBottom
                                sx={{ fontSize: '42px', width: '100%' }}
                                align="center"
                            >
                                All the features you need for effortless time
                                tracking
                            </Typography>
                            <Grid xs={12} container sx={{ padding: '0 26px' }}>
                                <Typography
                                    gutterBottom
                                    sx={{
                                        width: '100%',
                                        color: '#1D1E1C',
                                        fontSize: '27px',
                                        fontFamily: 'Roboto',
                                        fontWeight: '300',
                                    }}
                                    align="center"
                                >
                                    Harvest makes it easy to track time,
                                    automate invoicing and reporting, and get
                                    the insights you need.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </FeaturesSection>
            </Container>
        </>
    );
};

export default LandingPage;
