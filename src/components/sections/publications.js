import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaClipboard } from 'react-icons/fa';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { theme, media, Section, Heading } from '@styles';

const { colors, fontSizes, fonts } = theme;

const StyledContainer = styled(Section)`
  position: relative;
`;

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const StyledCard = styled.li`
  position: relative;
  margin-bottom: 24px;
  padding: 22px 24px;
  background-color: ${colors.lightNavy};
  border: 1px solid transparent;
  border-left: 3px solid rgba(100, 255, 218, 0.3);
  border-radius: ${theme.borderRadius};
  transition: ${theme.transition};

  &:hover {
    transform: translateY(-4px);
    background-color: ${colors.lightestNavy};
    border-color: rgba(100, 255, 218, 0.15);
    border-left-color: ${colors.green};
    box-shadow: 0 10px 30px -15px rgba(2, 12, 27, 0.7);
  }

  ${media.phablet`padding: 16px 18px;`};
  ${media.phone`padding: 14px 12px;`};
`;

const StyledTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  ${media.phone`flex-wrap: wrap; gap: 8px;`};
`;

const StyledTitleLink = styled.a`
  color: ${colors.lightestSlate};
  font-weight: 600;
  font-size: ${fontSizes.lg};
  text-decoration: none;
  transition: ${theme.transition};
  line-height: 1.4;
  flex: 1;

  &:hover {
    color: ${colors.green};
  }

  ${media.phablet`font-size: ${fontSizes.md};`};
`;

const StyledExternalIcon = styled.svg`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  margin-top: 4px;
  fill: none;
  stroke: ${colors.slate};
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: ${theme.transition};

  ${StyledCard}:hover & {
    stroke: ${colors.green};
  }
`;

const StyledYearBadge = styled.span`
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.smish};
  color: ${colors.green};
  background-color: rgba(100, 255, 218, 0.08);
  border: 1px solid rgba(100, 255, 218, 0.15);
  border-radius: 4px;
  padding: 2px 10px;
  white-space: nowrap;
  flex-shrink: 0;
`;

const StyledAuthors = styled.p`
  margin: 8px 0 6px;
  color: ${colors.slate};
  font-size: ${fontSizes.sm};
  line-height: 1.5;
`;

const StyledAuthorBold = styled.strong`
  color: ${colors.lightestSlate};
`;

const StyledMetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

const StyledJournal = styled.span`
  color: ${colors.slate};
  font-size: ${fontSizes.sm};
  font-style: italic;
`;

const StyledStatusBadge = styled.span`
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.xs};
  color: ${colors.navy};
  background-color: ${colors.green};
  border-radius: 3px;
  padding: 2px 8px;
  font-weight: 600;
`;

const StyledBibtexButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: transparent;
  color: ${colors.green};
  border: 1px solid rgba(100, 255, 218, 0.2);
  border-radius: 4px;
  font-size: ${fontSizes.xs};
  font-family: ${fonts.SFMono};
  cursor: pointer;
  transition: ${theme.transition};

  &:hover {
    background: rgba(100, 255, 218, 0.08);
    border-color: rgba(100, 255, 218, 0.4);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

const StyledTooltip = styled.span`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 100%;
  margin-bottom: 6px;
  background: ${colors.green};
  color: ${colors.navy};
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-family: ${fonts.SFMono};
  font-weight: 600;
  white-space: nowrap;
  pointer-events: none;
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

  const renderAuthors = authors => {
    if (!authors) {
      return null;
    }
    return authors.split(', ').map((author, idx) => {
      const trimmed = author.trim();
      const isMe = trimmed === 'Suborno Deb Bappon';
      return (
        <span key={idx}>
          {isMe ? <StyledAuthorBold>{trimmed}</StyledAuthorBold> : trimmed}
          {idx < authors.split(', ').length - 1 ? ', ' : ''}
        </span>
      );
    });
  };

  const parseJournal = journal => {
    const match = journal.match(/^(.+?)\s*\[Under Review\]$/);
    if (match) {
      return { name: match[1].trim(), status: 'Under Review' };
    }
    return { name: journal, status: null };
  };

  const handleBibtexCopy = (bibtex, index) => {
    const copyWithExec = text => {
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

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(bibtex)
        .then(() => completeSuccess())
        .catch(() => {
          if (copyWithExec(bibtex)) {
            completeSuccess();
          }
        });
    } else if (copyWithExec(bibtex)) {
      completeSuccess();
    }
  };

  return (
    <StyledContainer id="publications" ref={revealContainer}>
      <Heading>{frontmatter.title}</Heading>
      <StyledList>
        {publications.map((pub, i) => {
          const { name: journalName, status } = parseJournal(pub.journal);
          return (
            <StyledCard key={i}>
              <StyledTitleRow>
                <StyledTitleLink href={pub.link} target="_blank" rel="noopener noreferrer">
                  {pub.name}
                </StyledTitleLink>
                <StyledYearBadge>{pub.year}</StyledYearBadge>
                <StyledExternalIcon viewBox="0 0 24 24">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </StyledExternalIcon>
              </StyledTitleRow>

              <StyledAuthors>{renderAuthors(pub.authors)}</StyledAuthors>

              <StyledMetaRow>
                <StyledJournal>{journalName}</StyledJournal>
                {status && <StyledStatusBadge>{status}</StyledStatusBadge>}
              </StyledMetaRow>

              <div style={{ position: 'relative', display: 'inline-block' }}>
                <StyledBibtexButton
                  onClick={() => handleBibtexCopy(pub.bibtex || '', i)}
                  title="Copy BibTeX">
                  <FaClipboard />
                  BibTeX
                </StyledBibtexButton>
                {copiedIndex === i && <StyledTooltip>Copied!</StyledTooltip>}
              </div>
            </StyledCard>
          );
        })}
      </StyledList>
    </StyledContainer>
  );
};

Publications.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Publications;
