import React, { Component } from 'react';
import { Link } from 'gatsby';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { navLinks } from '@config';
import { Menu } from '@components';
import { IconLogo } from '@components/icons';
import styled from 'styled-components';
import { theme, mixins, media } from '@styles';
const { colors, fontSizes, fonts, loaderDelay } = theme;

const StyledContainer = styled.header`
  ${mixins.flexBetween};
  position: fixed;
  top: 0;
  padding: 0px 50px;
  background-color: ${colors.navy};
  transition: ${theme.transition};
  z-index: 1000;
  filter: none !important;
  pointer-events: auto !important;
  user-select: auto !important;
  width: 100%;
  height: ${theme.navHeight};
  box-shadow: 0 10px 30px -10px ${colors.shadowNavy};
  ${media.desktop`padding: 0 40px;`};
  ${media.tablet`padding: 0 25px;`};
`;
const StyledNav = styled.nav`
  ${mixins.flexBetween};
  position: relative;
  width: 100%;
  color: ${colors.lightestSlate};
  font-family: ${fonts.SFMono};
  counter-reset: item 0;
  z-index: 1001; /* Increased from 12 */
`;
const StyledLogo = styled.div`
  ${mixins.flexCenter};
  a {
    display: block;
    color: ${colors.green};
    width: 42px;
    height: 42px;
    &:hover,
    &:focus {
      svg {
        fill: ${colors.transGreen};
      }
    }
    svg {
      fill: none;
      transition: ${theme.transition};
      user-select: none;
    }
  }
`;
const StyledHamburger = styled.div`
  ${mixins.flexCenter};
  overflow: visible;
  margin: 0 -12px 0 0;
  padding: 15px;
  cursor: pointer;
  transition-timing-function: linear;
  transition-duration: 0.15s;
  transition-property: opacity, filter;
  text-transform: none;
  color: inherit;
  border: 0;
  background-color: transparent;
  display: none;
  ${media.tablet`display: flex;`};
`;
const StyledHamburgerBox = styled.div`
  position: relative;
  display: inline-block;
  width: ${theme.hamburgerWidth}px;
  height: 24px;
`;
const StyledHamburgerInner = styled.div`
  background-color: ${colors.green};
  position: absolute;
  width: ${theme.hamburgerWidth}px;
  height: 2px;
  border-radius: ${theme.borderRadius};
  top: 50%;
  left: 0;
  right: 0;
  transition-duration: 0.22s;
  transition-property: transform;
  transition-delay: ${props => (props.menuOpen ? `0.12s` : `0s`)};
  transform: rotate(${props => (props.menuOpen ? `225deg` : `0deg`)});
  transition-timing-function: cubic-bezier(
    ${props => (props.menuOpen ? `0.215, 0.61, 0.355, 1` : `0.55, 0.055, 0.675, 0.19`)}
  );
  &:before,
  &:after {
    content: '';
    display: block;
    background-color: ${colors.green};
    position: absolute;
    left: auto;
    right: 0;
    width: ${theme.hamburgerWidth}px;
    height: 2px;
    transition-timing-function: ease;
    transition-duration: 0.15s;
    transition-property: transform;
    border-radius: 4px;
  }
  &:before {
    width: ${props => (props.menuOpen ? `100%` : `120%`)};
    top: ${props => (props.menuOpen ? `0` : `-10px`)};
    opacity: ${props => (props.menuOpen ? 0 : 1)};
    transition: ${props => (props.menuOpen ? theme.hamBeforeActive : theme.hamBefore)};
  }
  &:after {
    width: ${props => (props.menuOpen ? `100%` : `80%`)};
    bottom: ${props => (props.menuOpen ? `0` : `-10px`)};
    transform: rotate(${props => (props.menuOpen ? `-90deg` : `0`)});
    transition: ${props => (props.menuOpen ? theme.hamAfterActive : theme.hamAfter)};
  }
`;
const StyledLink = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  ${media.tablet`display: none;`};
`;
const StyledList = styled.ol`
  ${mixins.flexBetween};
  padding: 0;
  margin: 0;
  list-style: none;
`;
const StyledListItem = styled.li`
  margin: 0 3px;
  position: relative;
  font-size: ${fontSizes.smish};
  counter-increment: item 1;
  white-space: nowrap;
  &:before {
    content: '0' counter(item) '.';
    text-align: right;
    color: ${colors.green};
    font-size: ${fontSizes.xs};
  }
`;
const StyledListLink = styled(Link)`
  padding: 12px 10px;
  position: relative;
  color: ${props => (props.isActive ? colors.green : 'inherit')};

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 10px;
    right: 10px;
    height: 2px;
    background-color: ${colors.green};
    transform: scaleX(${props => (props.isActive ? 1 : 0)});
    transition: transform 0.25s ${theme.easing};
  }

  &:hover:after {
    transform: scaleX(1);
  }
`;
const StyledResumeButton = styled.a`
  ${mixins.smallButton};
  margin-left: 10px;
  font-size: ${fontSizes.smish};
`;

class Nav extends Component {
  state = {
    isMounted: !this.props.isHome,
    menuOpen: false,
    activeSection: '',
  };

  componentDidMount() {
    setTimeout(
      () =>
        this.setState({ isMounted: true }, () => {
          window.addEventListener('keydown', e => this.handleKeydown(e));
          this.setupObserver();
        }),
      100,
    );
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', e => this.handleKeydown(e));
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  setupObserver() {
    const sectionIds = navLinks.map(({ url }) => url.replace('/#', ''));
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

    if (sections.length === 0) {return;}

    this.observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          this.setState({ activeSection: visible[0].target.id });
        }
      },
      { rootMargin: '-100px 0px -60% 0px' },
    );

    sections.forEach(section => this.observer.observe(section));
  }

  toggleMenu = () => this.setState({ menuOpen: !this.state.menuOpen });

  handleKeydown = e => {
    if (!this.state.menuOpen) {
      return;
    }

    if (e.which === 27 || e.key === 'Escape') {
      this.toggleMenu();
    }
  };

  render() {
    const { isMounted, menuOpen, activeSection } = this.state;
    const { isHome } = this.props;
    const timeout = isHome ? loaderDelay : 0;
    const fadeClass = isHome ? 'fade' : '';
    const fadeDownClass = isHome ? 'fadedown' : '';

    return (
      <StyledContainer>
        <Helmet>
          <body className={menuOpen ? 'blur' : ''} />
        </Helmet>
        <StyledNav>
          <TransitionGroup component={null}>
            {isMounted && (
              <CSSTransition classNames={fadeClass} timeout={timeout}>
                <StyledLogo tabindex="-1">
                  {isHome ? (
                    <a href="/" aria-label="home">
                      <IconLogo />
                    </a>
                  ) : (
                    <Link to="/" aria-label="home">
                      <IconLogo />
                    </Link>
                  )}
                </StyledLogo>
              </CSSTransition>
            )}
          </TransitionGroup>

          <TransitionGroup component={null}>
            {isMounted && (
              <CSSTransition classNames={fadeClass} timeout={timeout}>
                <StyledHamburger onClick={this.toggleMenu}>
                  <StyledHamburgerBox>
                    <StyledHamburgerInner menuOpen={menuOpen} />
                  </StyledHamburgerBox>
                </StyledHamburger>
              </CSSTransition>
            )}
          </TransitionGroup>

          <StyledLink>
            <StyledList>
              <TransitionGroup component={null}>
                {isMounted &&
                  navLinks &&
                  navLinks.map(({ url, name }, i) => (
                    <CSSTransition key={i} classNames={fadeDownClass} timeout={timeout}>
                      <StyledListItem
                        key={i}
                        style={{ transitionDelay: `${isHome ? i * 100 : 0}ms` }}>
                        <StyledListLink to={url} isActive={activeSection === url.replace('/#', '')}>
                          {name}
                        </StyledListLink>
                      </StyledListItem>
                    </CSSTransition>
                  ))}
              </TransitionGroup>
            </StyledList>

            <TransitionGroup component={null}>
              {isMounted && (
                <CSSTransition classNames={fadeDownClass} timeout={timeout}>
                  <div style={{ transitionDelay: `${isHome ? navLinks.length * 100 : 0}ms` }}>
                    <StyledResumeButton
                      href="/resume.pdf"
                      target="_blank"
                      rel="nofollow noopener noreferrer">
                      Resume
                    </StyledResumeButton>
                  </div>
                </CSSTransition>
              )}
            </TransitionGroup>
          </StyledLink>
        </StyledNav>

        <Menu menuOpen={menuOpen} toggleMenu={this.toggleMenu} />
      </StyledContainer>
    );
  }
}

Nav.propTypes = {
  isHome: PropTypes.bool,
};

export default Nav;
