import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaClipboard } from 'react-icons/fa';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { theme, media, Section, Heading } from '@styles';

const { colors, fontSizes } = theme;

const StyledContainer = styled(Section)`
  position: relative;
`;

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const StyledItem = styled.li`
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid ${colors.lightestNavy};
  border-radius: ${theme.borderRadius};
  transition: ${theme.transition};
  background-color: ${colors.lightNavy};

  &:hover {
    transform: translateY(-5px);
    border-color: ${colors.green};
  }

  // a {
  //   ${mixins.inlineLink};
  //   font-weight: 600;
  //   font-size: ${fontSizes.lg};
  // }

  a {
    color: ${colors.lightestSlate};
    font-weight: 600;
    font-size: ${fontSizes.lg};
    text-decoration: none;
    transition: ${theme.transition};
    cursor: pointer;

    &:hover,
    &:focus {
      color: ${colors.green};
      text-decoration: none; /* ❌ No underline */
    }
  }


  p {
    margin: 5px 0 0;
    color: ${colors.slate};
    font-size: ${fontSizes.sm};
  }

  ${media.phablet`
    padding: 15px;
  `}
`;

const StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 15px;
`;

const StyledBibtexButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: ${colors.green};
  color: ${colors.navy};
  border: none;
  border-radius: 4px;
  font-size: ${fontSizes.xs};
  font-weight: 600;
  cursor: pointer;
  transition: ${theme.transition};
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    background: ${colors.lightestSlate};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const StyledTooltip = styled.div`
  position: absolute;
  background: ${colors.green};
  color: ${colors.navy};
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  pointer-events: none;
  bottom: 100%;
  right: 0;
  margin-bottom: 8px;
  animation: fadeOut 2s forwards;

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const Publications = ({ data }) => {
  const revealContainer = useRef(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const { frontmatter } = data[0]?.node || {};
  const publications = frontmatter?.items || [];

  const renderAuthors = (authors) => {
    if (!authors) return null;
    return authors.split(', ').map((author, idx) => {
      const trimmed = author.trim();
      const isMe = trimmed === 'Suborno Deb Bappon';
      return (
        <span key={idx}>
          {isMe ? <strong>{trimmed}</strong> : trimmed}
          {idx < authors.split(', ').length - 1 ? ', ' : ''}
        </span>
      );
    });
  };

  const handleBibtexCopy = (bibtex, index) => {
    const copyWithExec = (text) => {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.top = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      let successful = false;
      try {
        successful = document.execCommand('copy');
      } catch (err) {
        successful = false;
      }

      document.body.removeChild(textarea);
      return successful;
    };

    const completeSuccess = () => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    };

    const promptFallback = () => {
      const confirmed = window.prompt('Copy the BibTeX text below:', bibtex);
      if (confirmed !== null) {
        alert('BibTeX text is shown in prompt, please copy manually.');
      }
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(bibtex).then(() => {
        completeSuccess();
      }).catch(() => {
        if (copyWithExec(bibtex)) {
          completeSuccess();
        } else {
          promptFallback();
        }
      });
    } else if (copyWithExec(bibtex)) {
      completeSuccess();
    } else {
      promptFallback();
    }
  };

  return (
    <StyledContainer id="publications" ref={revealContainer}>
      <Heading>{frontmatter.title}</Heading>
      <StyledList>
        {publications.map((pub, i) => (
          <StyledItem key={i}>
            <a href={pub.link} target="_blank" rel="noopener noreferrer">
              {pub.name}
            </a>
            <p>
              {renderAuthors(pub.authors)}
            </p>
            <p>
              <strong>{pub.journal}</strong>, {pub.year}
            </p>
            <div style={{ position: 'relative', marginTop: '14px' }}>
              <StyledBibtexButton
                onClick={() => handleBibtexCopy(pub.bibtex || 'No BibTeX available', i)}
                title="Copy BibTeX"
                disabled={false}
              >
                <FaClipboard size={14} />
                BibTeX
              </StyledBibtexButton>
              {copiedIndex === i && <StyledTooltip>Copied!</StyledTooltip>}
            </div>
          </StyledItem>
        ))}
      </StyledList>
    </StyledContainer>
  );
};

Publications.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Publications;

// export default Publications;