import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axiosInstance from '../../common/http';
import { useAuth } from '../../context/AuthContext';

const ProfileContainer = styled(Container)({
  marginTop: '2rem',
});

const ProfileSection = styled('div')({
  marginBottom: '1.5rem',
});

const SkillsChip = styled(Chip)(({ theme }) => ({
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

const ProfilePage = () => {
  const { userId } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({});

  const getProfile = async () => {
    try {
      const response = axiosInstance.get(`/professional/${userId}`);
      let response_data = response.data;
      setProfileData(response_data);
    } catch (e) {
      console.log(e);
    }

   
  };

  

  

  useEffect(()=>{
    getProfile()
  })
  return (
    <ProfileContainer maxWidth="md">
      {profileData!=undefined && (
        <Container>
          <Typography variant="h6">Profile</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <ProfileSection>
                <Typography variant="subtitle1">First Name:</Typography>
                <Typography>{profileData.first_name}</Typography>
              </ProfileSection>
            </Grid>
            <Grid item xs={12} md={6}>
              <ProfileSection>
                <Typography variant="subtitle1">Last Name:</Typography>
                <Typography>{profileData.last_name}</Typography>
              </ProfileSection>
            </Grid>
            <Grid item xs={12}>
              <ProfileSection>
                <Typography variant="subtitle1">Skills:</Typography>
                <div>
                  {/* {profileData.skill.map((s) => (
                    <SkillsChip key={s.id} label={s.name} />
                  ))} */}
                </div>
              </ProfileSection>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setModalOpen(true)}
              >
                Edit Profile
              </Button>
            </Grid>
          </Grid>

         
        </Container>
      )}

      
    </ProfileContainer>
  );
};

export default ProfilePage;
