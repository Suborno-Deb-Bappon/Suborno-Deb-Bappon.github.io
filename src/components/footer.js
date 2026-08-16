import React from 'react';
import { FormattedIcon } from '@components/icons';
import { socialMedia } from '@config';
import styled from 'styled-components';
import { theme, mixins, media } from '@styles';
const { colors, fontSizes, fonts } = theme;

const StyledContainer = styled.footer`
  ${mixins.flexCenter};
  flex-direction: column;
  padding: 15px;
  text-align: center;
  height: auto;
  min-height: 70px;
  ${media.phone`padding: 10px;`};
`;
const StyledSocial = styled.div`
  color: ${colors.lightSlate};
  width: 100%;
  max-width: 270px;
  margin: 0 auto 10px;
  display: none;
  ${media.tablet`display: block;`};
`;
const StyledSocialList = styled.ul`
  ${mixins.flexBetween};
  padding: 0;
  margin: 0;
  list-style: none;
`;
const StyledSocialLink = styled.a`
  padding: 10px;
  svg {
    width: 20px;
    height: 20px;
  }
`;
const StyledMetadata = styled.div`
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.xs};
  line-height: 1;
`;
const StyledGitHubLink = styled.a`
  color: ${colors.lightSlate};
  padding: 10px;
`;
const Footer = () => (
  <StyledContainer>
    <a
      href="https://info.flagcounter.com/rOSC"
      style={{ marginBottom: '30px', display: 'inline-block' }}>
      <img
        src="https://s01.flagcounter.com/count/rOSC/bg_FFFFFF/txt_000000/border_CCCCCC/columns_3/maxflags_9/viewers_0/labels_1/pageviews_1/flags_0/percent_0/"
        alt="Flag Counter"
        border="0"
        style={{ maxWidth: '100%' }}
      />
    </a>
    <StyledSocial>
      <StyledSocialList>
        {socialMedia &&
          socialMedia.map(({ name, url }, i) => (
            <li key={i}>
              <StyledSocialLink
                href={url}
                target="_blank"
                rel="nofollow noopener noreferrer"
                aria-label={name}>
                <FormattedIcon name={name} />
              </StyledSocialLink>
            </li>
          ))}
      </StyledSocialList>
    </StyledSocial>
    <StyledMetadata tabindex="-1">
      <StyledGitHubLink
        href="https://github.com/Suborno-Deb-Bappon"
        target="_blank"
        rel="nofollow noopener noreferrer">
        <div>
          Suborno Deb Bappon @2026<br></br>
        </div>
        {/* {githubInfo.stars && githubInfo.forks && (
            <StyledGitHubInfo>
              <span>
                <FormattedIcon name="Star" />
                <span>{githubInfo.stars.toLocaleString()}</span>
              </span>
              <span>
                <FormattedIcon name="Fork" />
                <span>{githubInfo.forks.toLocaleString()}</span>
              </span>
            </StyledGitHubInfo>
          )} */}
      </StyledGitHubLink>
    </StyledMetadata>
  </StyledContainer>
);

export default Footer;
