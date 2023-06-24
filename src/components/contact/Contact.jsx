import {
  Button,
  Container, Grid, Typography, Link as Linker, AccordionDetails, AccordionSummary, Accordion, ListItem, List, ListItemText, ListItemIcon,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PhoneIcon from '@mui/icons-material/Phone';
import { LocationCity, Mail } from '@mui/icons-material';

import JPaper from '../../styles/jPaper';
import LPaper from '../../styles/lPaper';

export default function ContactPage() {
  const { t } = useTranslation();
  return (
    <Container sx={{ mb: '50px' }}>
      <LPaper>
        <Typography variant="h4">{t('Information')}</Typography>
      </LPaper>
      <Grid container spacing={2}>
        {/* <Grid item xs={12}>
          <JPaper sx={{ minWidth: '100%' }}><Typography variant="h4">{t('DoYouHaveAQuestionOrDoYouWantMoreInformation')}</Typography></JPaper>
        </Grid> */}
        <Grid item xs={12} md={6}>
          <JPaper sx={{ minWidth: '100%' }}><Typography variant="h5" data-cy="conctactHeader">{t('IamNotACustomerYet')}</Typography></JPaper>
          <LPaper sx={{ backgroundColor: '#c42828' }}>
            <Typography variant="p">
              {t('WouldYouLikeMoreInformationAboutOurOfferingsOrServices')}
              {' '}
              {' '}
              {t('FillOutTheContactFormAndWeWillGetBackToYou')}
            </Typography>
            <ListItem>

              <Button sx={{ mt: '20px' }} component={Link} to="/formNotCustomer" variant="contained" data-cy="contactFormButton">{t('FillOutAContactForm')}</Button>

            </ListItem>
          </LPaper>

        </Grid>
        <Grid item xs={12} md={6}>
          <JPaper sx={{ minWidth: '100%' }}><Typography variant="h5">{t('IAmACustomer')}</Typography></JPaper>
          <LPaper sx={{ backgroundColor: '#c42828' }}>
            <Typography variant="p">
              {t('DoYouHaveASpecificQuestionOrSuggestions')}
              {' '}
              {t('LetUsKnow')}
            </Typography>
            <ListItem>

              <Button sx={{ mt: '20px' }} component={Link} to="/formCustomer" variant="contained">{t('FillOutAContactForm')}</Button>

            </ListItem>

          </LPaper>

        </Grid>
        <Grid item xs={0} md={3} lg={3} />
        <Grid item xs={12} md={6} lg={6}>
          <JPaper sx={{ minWidth: '100%', padding: '50px' }}>
            <Typography variant="h5">
              {t('PerhapsYourQuestionIsAlreadyKnown')}
              {' '}
              {' '}
            </Typography>
            <Typography variant="p">

              {t('PleaseReferToOur')}
              {' '}
              <Linker onClick={() => {
                window.scrollTo({
                  top: 800,
                  left: 10,
                  behavior: 'smooth',
                });
              }}
              >
                {t('FrequentlyAskedQuestions')}

              </Linker>
            </Typography>

          </JPaper>
        </Grid>
        <Grid item lg={3} md={3} xs={0} />
        <Grid item xs={12} md={6}>
          <LPaper>
            <Typography sx={{ p: '10px', minWidth: '50%' }} variant="h5">
              {t('QuestionsAnswers')}
            </Typography>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{t('WhyCantICompleteMyOrder')}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="p">
                  {t('CheckTheFollowingItems')}

                  <ListItem>
                    {t('AreYouLoggedInRegisterFirst')}

                  </ListItem>
                  <ListItem>
                    {t('HaveYouAlreadyConfirmed')}
                  </ListItem>

                  <ListItem>
                    {t('AreThereProductsInYourShoppingBasket')}

                  </ListItem>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{t('HowCanIChangeMyOrder')}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="p">
                  {t('ItIsCurrentlyNot')}
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{t('HowAndWhenDoIPay')}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="p">
                  {t('WithAPositiveCreditScore')}
                </Typography>
              </AccordionDetails>
            </Accordion>

          </LPaper>

        </Grid>
        <Grid item xs={12} md={6}>
          <JPaper sx={{ minWidth: '100%' }}>
            <Typography variant="h5">
              {t('ContactUs')}
            </Typography>
            <List>
              <ListItem>

                <ListItemIcon>
                  <PhoneIcon />
                </ListItemIcon>
                <ListItemText primary={t('Call')} />

              </ListItem>
              <ListItem>

                <ListItemIcon>
                  <Mail />
                </ListItemIcon>
                <ListItemText primary={t('Mail')} />

              </ListItem>
              <ListItem>

                <ListItemIcon>
                  <LocationCity />
                </ListItemIcon>
                <ListItemText primary="Delaware Shipping " secondary="Blue Tower 1, Sluisweg 1, 9000 Gent" />

              </ListItem>

            </List>

          </JPaper>
        </Grid>
      </Grid>

    </Container>
  );
}