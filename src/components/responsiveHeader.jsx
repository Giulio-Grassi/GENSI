import React from 'react';

import { Grommet, Header, Anchor, Box, ResponsiveContext, Menu } from 'grommet';
import { Grommet as GrommetIcon, Menu as MenuIcon } from 'grommet-icons';
import { grommet } from 'grommet/themes';

export default function  responsiveHeader(){
    return(
    <Header background="light-4" pad="medium" height="xxsmall">
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
    </Header>
    )
    }