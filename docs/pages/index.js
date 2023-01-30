import { Button, Card, Grid, Text, Badge } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { CgPerformance } from 'react-icons/cg';
import { IoRocketOutline } from 'react-icons/io5';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { useTranslation, Code } from 'engrafia';
import { Demo } from '../demo';
import Link from 'next/link';

const createForm = `const useForm = createForm({
  initialValues: {
    name: "Jesse Woodson James",
    email: "jesse@jesse.com",
    bio: ""
  }
  mode: "onChange",
});`;

const useform = `const Controlled: React.FC = () => {
  const { register } = useForm({
    onChange: (e) => console.log(e)
  });

  return (
    <form>
      <input
        className="form-control"
        autoComplete="off"
        {...register("name")}
      />
    </form>
  )
}`;

export const getStaticProps = async () => {
  return {
    props: {
      meta: {
        title: 'React form library',
        description:
          'Use Form provides you a simple way to create forms with React.',
        tags: 'reactjs, forms, use-form, useform, form',
      },
    },
  };
};

export default function Index() {
  const router = useRouter();
  const t = useTranslation();
  return (
    <Grid.Container justify="center">
      <Grid.Container justify="center" direction="column" alignItems="center">
        <Grid.Container
          justify="center"
          direction="column"
          alignItems="center"
          css={{ maxW: '87rem' }}
        >
          <Text
            h1
            css={{
              textGradient: '45deg, #0b132b -20%, #6fffe9 50%',
            }}
            weight="bold"
            size="5rem"
          >
            UseForm
          </Text>

          <Text as="h2" css={{ zIndex: '$1' }}>
            Use Form provides you with a simple way to create forms with React
          </Text>
        </Grid.Container>
        <Grid.Container
          gap={2}
          justify="center"
          alignItems="center"
          css={{ zIndex: 1, mb: '$10' }}
        >
          <Grid>
            <Button
              onClick={() => router.push(`/docs/introduction/quick-start`)}
            >
              Get start
            </Button>
          </Grid>
          <Card
            css={{
              px: '$6',
              pt: '7px',
              h: '40px',
              w: 'auto',
              shadow: '$sm',
              border: '1px solid $border',
              backdropFilter: 'saturate(180%) blur(10px)',
              background: '$backgroundAlpha',
            }}
          >
            yarn add @use-form/use-form
          </Card>
        </Grid.Container>
        <Grid.Container
          justify="center"
          direction="column"
          alignItems="center"
          css={{ maxW: '87rem' }}
        >
          <Demo url="https://codesandbox.io/embed/useform-forked-oojuq?fontsize=14&hidenavigation=1&theme=dark" />
        </Grid.Container>
      </Grid.Container>

      <Grid.Container
        gap={2}
        justify="center"
        css={{ zIndex: 1, mb: 200, mt: 100 }}
      >
        <Grid>
          <Card
            css={{
              p: '$6',
              mw: '400px',
              h: 320,
              shadow: '$sm',

              backdropFilter: 'saturate(180%) blur(14px)',
              background: 'rgba(255, 255, 255, 0.05)',
            }}
          >
            <Card.Header>
              <MdOutlineDashboardCustomize size={40} />
              <Grid.Container css={{ pl: '$6' }}>
                <Grid xs={12}>
                  <Text h4 css={{ lineHeight: '$xs' }}>
                    Flexible
                  </Text>
                </Grid>
              </Grid.Container>
            </Card.Header>
            <Card.Body css={{ py: '$2' }}>
              <Text>
                {
                  'Looking to create a form that can handle onSubmit, onChange, or debounced events? With UseForm, you have the power to create forms with custom fields and validation rules. UseForm lets you create forms that can be used in either controlled or uncontrolled mode, giving you the flexibility to design the form that best fits your needs. So why wait? Start creating powerful forms with UseForm today!'
                }
              </Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid>
          <Card
            css={{
              p: '$6',
              mw: '400px',
              h: 320,
              shadow: '$sm',

              backdropFilter: 'saturate(180%) blur(14px)',
              background: 'rgba(255, 255, 255, 0.05)',
            }}
          >
            <Card.Header>
              <IoRocketOutline size={40} />
              <Grid.Container css={{ pl: '$6' }}>
                <Grid xs={12}>
                  <Text h4 css={{ lineHeight: '$xs' }}>
                    Easy
                  </Text>
                </Grid>
              </Grid.Container>
            </Card.Header>
            <Card.Body css={{ py: '$2' }}>
              <Text>
                {
                  "Less code. UseForm is the easiest way to create forms with React. Create a form and use it wherever you want, don't worry with React Context, or Redux. You can share your form with other components just by using the hook created by createForm function."
                }
              </Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid>
          <Card
            css={{
              p: '$6',
              mw: '400px',
              h: 320,
              shadow: '$sm',
              backdropFilter: 'saturate(180%) blur(14px)',
              background: 'rgba(255, 255, 255, 0.05)',
            }}
          >
            <Card.Header>
              <CgPerformance size={40} />
              <Grid.Container css={{ pl: '$6' }}>
                <Grid xs={12}>
                  <Text h4 css={{ lineHeight: '$xs' }}>
                    Performant
                  </Text>
                </Grid>
              </Grid.Container>
            </Card.Header>
            <Card.Body css={{ py: '$2' }}>
              <Text>
                {
                  'Just one render. There are many form libraries, most of which are heavy, and allow you to create just one kind of form, but with UseForm you can fulfill and submit a form with just one render.'
                }
              </Text>
            </Card.Body>
          </Card>
        </Grid>

        <Grid
          css={{ borderTop: '1px solid $border', w: '87rem', my: '5rem' }}
        />

        <Grid.Container gap={2} css={{ zIndex: 1, maxW: '87rem', mb: '8rem' }}>
          <Grid md={6} sm={12} direction="column">
            <Grid sm={12} md={12} direction="column">
              <Text
                h1
                css={{
                  lineHeight: '$xs',
                }}
              >
                Less code{' '}
              </Text>
              <Text css={{ mb: '$14' }}>
                {`Trust us, you will not find another better way to write forms in ReactJS, write less code, use it wherever you want. You don't need to add a function to handle all needed events in an input, you just need to use the `}
                <code>register</code> {`function.`}
                <Badge isSquared color="secondary" variant="flat">
                  <Link href="/docs/how-it-works/concept">Read more</Link>
                </Badge>
              </Text>
            </Grid>
            <Grid sm={12} md={12}>
              <Code className="javascript" boxShadow="$md">
                {createForm}
              </Code>
            </Grid>
          </Grid>
          <Grid md={6} sm={12}>
            <Grid sm={12} md={12}>
              <Code className="javascript" boxShadow="$md">
                {useform}
              </Code>
            </Grid>
          </Grid>
        </Grid.Container>
      </Grid.Container>
    </Grid.Container>
  );
}
