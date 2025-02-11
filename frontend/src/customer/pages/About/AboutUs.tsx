import React from "react";
import { Box, Typography, Grid, Card, CardContent, Avatar, Container } from "@mui/material";
import { Build, VerifiedUser, Star, Phone, Email } from "@mui/icons-material";

const AboutUs = () => {
  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", py: 5 }}>
      {/* Hero Section */}
      <Box
        sx={{
          height: 350,
          background: `url('https://source.unsplash.com/1600x900/?tools,repair') center/cover`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          backgroundBlendMode: "darken",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <Box>
          <Typography variant="h3" fontWeight="bold">About Us</Typography>
          <Typography variant="h6">Your Trusted Partner for Home Appliance Repairs</Typography>
        </Box>
      </Box>

      {/* Company Story */}
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Typography variant="h4" align="center" fontWeight="bold">Our Story</Typography>
        <Typography variant="body1" align="center" sx={{ mt: 2, color: "gray" }}>
          We started with a simple mission: To make home appliance repairs easy, affordable, and reliable.
          With a team of skilled technicians and a commitment to excellence, we ensure your appliances run smoothly.
        </Typography>
      </Container>

      {/* Why Choose Us Section */}
      <Box sx={{ bgcolor: "white", py: 5 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" fontWeight="bold">Why Choose Us?</Typography>
          <Grid container spacing={4} sx={{ mt: 3 }}>
            {[
              { icon: <Build fontSize="large" color="primary" />, title: "Expert Technicians", desc: "Certified professionals ensuring quality repairs." },
              { icon: <VerifiedUser fontSize="large" color="success" />, title: "Trusted & Secure", desc: "We prioritize safety and security in every service." },
              { icon: <Star fontSize="large" color="warning" />, title: "Customer Satisfaction", desc: "Over 5,000+ happy customers trust our services." }
            ].map((item, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Card sx={{ p: 3, textAlign: "center", boxShadow: 3 }}>
                  {item.icon}
                  <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{item.desc}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Our Team Section */}
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Typography variant="h4" align="center" fontWeight="bold">Meet Our Experts</Typography>
        <Grid container spacing={4} sx={{ mt: 3 }} justifyContent="center">
          {[
            { name: "Prathamesh Auti", role: "Founder & Lead Technician", img: "https://source.unsplash.com/200x200/?man,mechanic" },
            { name: "Sangam Biradar", role: "Customer Relations Manager", img: "https://source.unsplash.com/200x200/?woman,engineer" }
          ].map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ p: 3, textAlign: "center", boxShadow: 3 }}>
                <Avatar src={member.img} sx={{ width: 80, height: 80, mx: "auto", mb: 2 }} />
                <Typography variant="h6" fontWeight="bold">{member.name}</Typography>
                <Typography variant="body2" color="text.secondary">{member.role}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Contact Section */}
      <Box sx={{ bgcolor: "#1976D2", py: 5, color: "white", textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold">Get in Touch</Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>Have questions? We're here to help.</Typography>
        <Grid container justifyContent="center" spacing={4} sx={{ mt: 3 }}>
          {[{ icon: <Phone fontSize="large" />, text: "+91 9855555512" }, { icon: <Email fontSize="large" />, text: "fixify777@gmail.com" }].map((contact, index) => (
            <Grid item key={index}>
              <Box display="flex" alignItems="center" gap={2}>
                {contact.icon}
                <Typography variant="body1">{contact.text}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default AboutUs;
