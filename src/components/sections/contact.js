import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import sr from '@utils/sr';
import { srConfig, email, phone, location } from '@config';
import styled from 'styled-components';
import { theme, mixins, media, Section, Heading } from '@styles';
const { colors, fontSizes, fonts } = theme;


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
const StyledInput = styled.input`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid ${colors.lightSlate};
  border-radius: 4px;
  background: ${colors.navy};
  color: ${colors.white};
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: ${colors.green};
  }
`;
const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid ${colors.lightSlate};
  border-radius: 4px;
  background: ${colors.navy};
  color: ${colors.white};
  font-size: 16px;
  min-height: 120px;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: ${colors.green};
  }
`;
const StyledButton = styled.button`
  ${mixins.bigButton};
  margin-top: 20px;
  width: 100%;
  max-width: 200px;
`;
const StyledError = styled.span`
  color: #ff6b6b;
  font-size: 14px;
  margin-top: -5px;
  margin-bottom: 5px;
`;

const ContactForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('https://formspree.io/f/mzdkjdla', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert('Message sent successfully!');
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      alert('Error sending message. Please try again.');
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledInput
        {...register('name', { required: 'Name is required' })}
        placeholder="Your Name"
      />
      {errors.name && <StyledError>{errors.name.message}</StyledError>}
      <StyledInput
        {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
        type="email"
        placeholder="Your Email"
      />
      {errors.email && <StyledError>{errors.email.message}</StyledError>}
      <StyledTextarea
        {...register('message', { required: 'Message is required' })}
        placeholder="Your Message"
      />
      {errors.message && <StyledError>{errors.message.message}</StyledError>}
      <StyledButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </StyledButton>
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

      <StyledEmailLink href={`mailto:${email}`}>
        {buttonText}
      </StyledEmailLink>
      {phone && (
        <StyledContactInfo>
          Or call me at: <a href={`tel:${phone}`}>{phone}</a>
        </StyledContactInfo>
      )}
      {location && (
        <StyledContactInfo>
          Based in {location}
        </StyledContactInfo>
      )}
      <ContactForm />
    </StyledContainer>
  );
};

Contact.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Contact;
