import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import sr from '@utils/sr';
import { srConfig, email, phone, location } from '@config';
import styled, { keyframes } from 'styled-components';
import { theme, mixins, media, Section, Heading } from '@styles';
const { colors, fontSizes, fonts } = theme;

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
`;

const StyledContainer = styled(Section)`
  text-align: center;
  max-width: 600px;
  margin: 0 auto 100px;
  a {
    ${mixins.inlineLink};
  }
`;
const StyledHeading = styled(Heading)`
  display: block;
  color: ${colors.green};
  font-size: ${fontSizes.md};
  font-family: ${fonts.SFMono};
  font-weight: normal;
  margin-bottom: 20px;
  justify-content: center;
  ${media.desktop`font-size: ${fontSizes.sm};`};
  &:before {
    bottom: 0;
    font-size: ${fontSizes.sm};
    ${media.desktop`font-size: ${fontSizes.smish};`};
  }
  &:after {
    display: none;
  }
`;
const StyledTitle = styled.h4`
  margin: 0 0 20px;
  font-size: 60px;
  ${media.desktop`font-size: 50px;`};
  ${media.tablet`font-size: 40px;`};
`;
const StyledEmailLink = styled.a`
  ${mixins.bigButton};
  margin-top: 50px;
`;
const StyledContactInfo = styled.p`
  margin-top: 20px;
  font-size: 18px;
  color: ${colors.slate};
  a {
    color: ${colors.green};
  }
`;
const StyledForm = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;
const StyledRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  width: 100%;
  ${media.phablet`grid-template-columns: 1fr;`};
`;
const StyledInput = styled.input`
  width: 100%;
  padding: 14px 16px;
  margin: 6px 0;
  border: 1px solid ${props => (props.hasError ? '#ff6b6b' : colors.lightestNavy)};
  border-radius: 4px;
  background: ${colors.lightNavy};
  color: ${colors.white};
  font-size: 16px;
  font-family: ${fonts.Calibre};
  transition: ${theme.transition};
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${colors.green};
    box-shadow: 0 0 0 2px rgba(100, 255, 218, 0.15);
    background: ${colors.navy};
  }

  &::placeholder {
    color: ${colors.slate};
  }
`;
const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 14px 16px;
  margin: 6px 0;
  border: 1px solid ${props => (props.hasError ? '#ff6b6b' : colors.lightestNavy)};
  border-radius: 4px;
  background: ${colors.lightNavy};
  color: ${colors.white};
  font-size: 16px;
  font-family: ${fonts.Calibre};
  min-height: 130px;
  resize: vertical;
  transition: ${theme.transition};
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${colors.green};
    box-shadow: 0 0 0 2px rgba(100, 255, 218, 0.15);
    background: ${colors.navy};
  }

  &::placeholder {
    color: ${colors.slate};
  }
`;
const StyledButton = styled.button`
  ${mixins.bigButton};
  margin-top: 20px;
  width: 100%;
  max-width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  overflow: hidden;
`;
const StyledError = styled.span`
  color: #ff6b6b;
  font-size: 13px;
  margin: -4px 0 2px;
  align-self: flex-start;
  font-family: ${fonts.SFMono};
`;
const StyledSuccessWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  animation: ${fadeIn} 0.4s ease;
`;
const StyledCheckmark = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: rgba(100, 255, 218, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;

  svg {
    width: 32px;
    height: 32px;
    fill: none;
    stroke: ${colors.green};
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;
const StyledSuccessText = styled.p`
  color: ${colors.green};
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.lg};
  margin: 0 0 6px;
`;
const StyledSuccessSubtext = styled.p`
  color: ${colors.slate};
  font-size: ${fontSizes.sm};
  margin: 0;
`;

const Spinner = styled.svg`
  animation: spin 0.8s linear infinite;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ContactForm = () => {
  const [status, setStatus] = useState('idle');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async data => {
    setStatus('sending');
    try {
      const response = await fetch('https://formspree.io/f/mzdkjdla', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <StyledSuccessWrapper>
        <StyledCheckmark>
          <svg viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </StyledCheckmark>
        <StyledSuccessText>Message Sent!</StyledSuccessText>
        <StyledSuccessSubtext>
          Thanks for reaching out — I'll get back to you soon.
        </StyledSuccessSubtext>
      </StyledSuccessWrapper>
    );
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledRow>
        <div style={{ width: '100%' }}>
          <StyledInput
            {...register('name', { required: 'Name is required' })}
            placeholder="Your Name"
            hasError={!!errors.name}
          />
          {errors.name && <StyledError>{errors.name.message}</StyledError>}
        </div>
        <div style={{ width: '100%' }}>
          <StyledInput
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
            })}
            type="email"
            placeholder="Your Email"
            hasError={!!errors.email}
          />
          {errors.email && <StyledError>{errors.email.message}</StyledError>}
        </div>
      </StyledRow>
      <StyledTextarea
        {...register('message', { required: 'Message is required' })}
        placeholder="Your Message"
        hasError={!!errors.message}
      />
      {errors.message && <StyledError>{errors.message.message}</StyledError>}
      <StyledButton type="submit" disabled={isSubmitting || status === 'sending'}>
        {status === 'sending' ? (
          <>
            <Spinner width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.3" />
              <path
                d="M12 2a10 10 0 019.95 9"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </Spinner>
            Sending
          </>
        ) : (
          <>
            Send Message
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </>
        )}
      </StyledButton>
      {status === 'error' && (
        <StyledError style={{ marginTop: '10px', alignSelf: 'center' }}>
          Failed to send. Please try again or email me directly.
        </StyledError>
      )}
    </StyledForm>
  );
};

const Contact = ({ data }) => {
  const { frontmatter, html } = data[0].node;
  const { title, buttonText } = frontmatter;
  const revealContainer = useRef(null);
  useEffect(() => sr.reveal(revealContainer.current, srConfig()), []);

  return (
    <StyledContainer id="contact" ref={revealContainer}>
      <StyledHeading>What&apos;s Next?</StyledHeading>

      <StyledTitle>{title}</StyledTitle>

      <div dangerouslySetInnerHTML={{ __html: html }} />

      <StyledEmailLink href={`mailto:${email}`}>{buttonText}</StyledEmailLink>
      {phone && (
        <StyledContactInfo>
          Or call me at: <a href={`tel:${phone}`}>{phone}</a>
        </StyledContactInfo>
      )}
      {location && <StyledContactInfo>Based in {location}</StyledContactInfo>}
      <ContactForm />
    </StyledContainer>
  );
};

Contact.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Contact;
