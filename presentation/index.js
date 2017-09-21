// Import React
import React from "react";

// Import Spectacle Core tags
import {
  BlockQuote,
  CodePane,
  Cite,
  Deck,
  Fill,
  Fit,
  Heading,
  Image,
  Layout,
  Link,
  ListItem,
  List,
  Notes,
  Quote,
  Slide,
  Text
} from "spectacle";

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

const theme = createTheme({
  primary: "white",
  secondary: "#1F2022",
  tertiary: "#03A9FC",
  quartenary: "#CECECE"
}, {
  primary: "Montserrat",
  secondary: "Helvetica"
});

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");
require("../themes/seattlejs/index.css");
// Best way to include fonts rite
require("../fonts/worksans.css");
require("../fonts/biorhyme.css");
require("../fonts/silkscreen.css");

const images = {
  skyline: require("../assets/skyline.jpg"),
  walken: require("../assets/walken.jpg"),
  samo: require("../assets/samo.jpg"),
  flex: require("../assets/flex.jpg")
};

preloader(images);

const builtIns = `
function validate(values) {
  return validator(values, form => {
    form.validate('username', 'password', 'confirm').required()
    form.validate('confirm').matches('password')
    form.validate('gpa').isNumeric()
  })
}
`;

const translations = `
function validate(values) {
  return validator(values, form => {
    form.validate('username', 'password', 'confirm').required()
    form.validate('confirm').matches('password')
  }, (message, field) => I18n.t(\`forms.newUser.\${field}.\${message}\`))
}
`;

const nested = `
function validate(values) {
  return validator(values, form => {
    form.validateChild('address', address => {
      address.validate('street').required()
    })

    form.validateChildren('contacts', contact => {
      contact.validate('name', 'email').required()
    })
  })
}
`;

const nestedTranslations = `
function validate(values) {
  return validator(values, form => {
    form.validate('username', 'password', 'confirm').required()
    form.validate('confirm').matches('password')

    form.validateChild('address', address => {
      address.validate('street').required()
    }, (message, field) => I18n.t(\`forms.newUser.address.\${field}.\${message}\`))
  }, (message, field) => I18n.t(\`forms.newUser.\${field}.\${message}\`))
}
`;

const theGoodWay = `
defineValidator({
  name: 'required',
  rule: value => {
    if (!value) {
      return 'Cannot be blank, dude'
    }
  }
})
`;

const theBetterWay = `
function greaterThan(n) {
  return value => {
    if (value <= n) {
      return 'too_small'
    }
  }
}
 
function lessThan(n) {
  return value => {
    if (value >= n) {
      return 'too_big'
    }
  }
}
 
function validate(values) {
  return validator(values, form => {
    form.validate('age').satisfies(greaterThan(17), lessThan(26))
  })
}
`;

const reduxForm = `
export default reduxForm({
  form: 'someForm',
  validate: (values, props) => {
    const errors = {}

    // populate errors object

    return errors
  }
})
`;

const reduxFormValidateThis = `
export default reduxForm({
  form: 'someForm',
  validate: (values, props) => {
    return validator(values, form => {
      form.validate('age').satisfies(greaterThan(17), lessThan(26))
    })
  }
})
`;

export default class Presentation extends React.Component {
  renderSponsorHeading(text) {
    return (
      <Heading
        caps
        size={6}
        style={{ letterSpacing: "0.05em" }}
      >
        {text}
      </Heading>
    );
  }

  background(image) {
    return  {
      backgroundImage: `url(${image})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "top center",
      backgroundSize: "105% auto",
      color: 'white'
    };
  }

  render() {
    const skylineBg = this.background(images.skyline);

    const walkenBg = this.background(images.walken);

    const samoBg = this.background(images.samo);

    return (
      <Deck
        progress="none"
        theme={theme}
        transition={["fade"]}
        transitionDuration={500}
      >
        <Slide style={skylineBg}>
          <div style={{ backgroundColor: 'rgba(0, 0, 0, .35)', padding: '20px' }}>
            <Heading size={1} textColor="primary">React MPLS</Heading>
            <Text textFont="monospace" margin="auto auto 5em auto" textColor="primary">
              Sept 21, 2017
            </Text>
            <Heading size={4} textColor="primary">Validate this, that, and the other thing</Heading>
          </div>
        </Slide>
        <Slide style={walkenBg}>
          <BlockQuote>
            <Quote>Does your mother validate? Tell her to validate-this!</Quote>
            <Cite textColor="primary">Christopher Walken (but not really)</Cite>
          </BlockQuote>
        </Slide>
        <Slide>
          <Heading size={3} textColor="secondary">Sam Slotsky</Heading>
          <Layout>
            <Fit>
              <Image height={300} width={300} src={images.samo} />
            </Fit>
            <Fill>
              <List style={{ listStyle: 'none', paddingLeft: '20px' }}>
                <ListItem>Lucky husband</ListItem>
                <ListItem>Proud dad</ListItem>
                <ListItem>Jazz saxophonist</ListItem>
                <ListItem>Professional JavaScript nerd</ListItem>
                <ListItem>Really, really bad at slides</ListItem>
              </List>
            </Fill>
          </Layout>
        </Slide>
        <Slide>
          <Heading size={3} textColor="secondary">Validate what now?</Heading>
          <List style={{ listStyle: 'square' }}>
            <ListItem>Absolutely any JavaScript object, with nested objects and arrays</ListItem>
            <ListItem>Returns a JavaScript object with complete error information</ListItem>
            <ListItem>Agnostic, but not-so-accidentally works very well with redux-form</ListItem>
            <ListItem>Custom validations are first class citizens</ListItem>
          </List>
        </Slide>
        <Slide>
          <Heading size={3} textColor="secondary">Built In Validations</Heading>
          <Text textFont="monospace" margin="auto auto 1em auto" textColor="secondary">
            (we only have a few)
          </Text>
          <CodePane lang="javascript" source={builtIns} />
        </Slide>
        <Slide>
          <Heading size={3} textColor="secondary">Message Translation</Heading>
          <CodePane lang="javascript" source={translations} />
        </Slide>
        <Slide>
          <Heading size={3} textColor="secondary">Nested Objects &amp; Arrays</Heading>
          <CodePane lang="javascript" source={nested} />
        </Slide>
        <Slide>
          <Heading size={3} textColor="secondary">Nested Translations</Heading>
          <CodePane lang="javascript" source={nestedTranslations} />
        </Slide>
        <Slide>
          <Heading size={3} textColor="secondary">Custom Validations</Heading>
          <Text textFont="monospace" margin="auto auto 1em auto" textColor="secondary">
            For Better Flexibility
          </Text>
          <Image src={images.flex} />
        </Slide>
        <Slide>
          <Heading size={3} textColor="secondary">The Good Way</Heading>
          <Text textFont="monospace" margin="auto auto 1em auto" textColor="secondary">
            Create your own built-in rules
          </Text>
          <CodePane lang="javascript" source={theGoodWay} />
        </Slide>
        <Slide>
          <Heading size={3} textColor="secondary">The Better Way</Heading>
          <Text textFont="monospace" margin="auto auto 1em auto" textColor="secondary">
            Satisfy any condition
          </Text>
          <CodePane lang="javascript" source={theBetterWay} />
        </Slide>
        <Slide>
          <Heading size={3} textColor="secondary">Validate Anything</Heading>
        </Slide>
        <Slide>
          <Heading size={3} textColor="secondary">Validate Anything</Heading>
          <Text textFont="monospace" margin="auto auto 5em auto" textColor="secondary">
            At least, I think so
          </Text>
        </Slide>
        <Slide>
          <Heading size={3} textColor="secondary">Validate Anything</Heading>
          <Text textFont="monospace" margin="auto auto 5em auto" textColor="secondary">
            Seriously though, no regex please
          </Text>
        </Slide>
        <Slide>
          <Heading size={3} textColor="secondary">Redux-Form</Heading>
          <CodePane lang="javascript" source={reduxForm} />
        </Slide>
        <Slide>
          <Heading size={3} textColor="secondary">Redux-Form</Heading>
          <Text textFont="monospace" margin="auto auto 1em auto" textColor="secondary">
            With a shot of validate-this
          </Text>
          <CodePane lang="javascript" source={reduxFormValidateThis} />
        </Slide>
      </Deck>
    );
  }
}
