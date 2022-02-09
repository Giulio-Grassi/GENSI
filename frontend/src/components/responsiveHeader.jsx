import React from 'react';

import { Grommet, Header, Anchor, Box, ResponsiveContext, Menu, Button } from 'grommet';
import { Grommet as GrommetIcon, Menu as MenuIcon } from 'grommet-icons';
import './assets/css/styles.css'
import { acme } from "./assets/themes/theme";
import { deepMerge } from "grommet/utils";
import { grommet } from "grommet";
const theme = deepMerge(grommet, acme);

export default function  responsiveHeader(props){
    return(
      <Grommet
        theme={theme}
        themeMode={props.darkMode ? "dark" : "light"}
      >
        <Header  background="background-front" pad="medium" height="xxsmall">
          <Anchor
            href="https://tools.grommet.io/"
            icon={<GrommetIcon color="brand" />}
            label="Nice and responsive header with anchors"
          />
          <ResponsiveContext.Consumer>
            {size =>
              size === 'small' ? (
                <Box justify="end">
                  <Menu
                    a11yTitle="Navigation Menu"
                    dropProps={{ align: { top: 'bottom', right: 'right' } }}
                    icon={<MenuIcon color="brand" />}
                    items={[
                      {
                        label: <Box pad="small">Hyperlink</Box>,
                        href: 'https://v2.grommet.io/',
                      },
                      {
                        label: <Box pad="small">Hyperlink</Box>,
                        href: 'https://github.com/grommet/grommet/issues',
                      },
                    ]}
                  />
                </Box>
              ) : (
                <Box justify="end" direction="row" gap="medium">
                  <Anchor href="https://v2.grommet.io/" label="Hyperlink.io" />
                  <Anchor
                    href="https://github.com/grommet/grommet/issues"
                    label="Hyperlink"
                  />
                </Box>
              )
            }
          </ResponsiveContext.Consumer>
          <Button
              label="Toggle Theme"
              primary
              alignSelf="right"
              margin="none"
              onClick={() => props.setDarkMode(!props.darkMode)}
            />
        </Header>
      </Grommet>
    )
}