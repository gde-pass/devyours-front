export default {
  title: 'Atoms/SocialButton',
  argTypes: {
    icon: {
      control: {
        type: 'select',
        options: [
          ['fab', 'github', 'text-github'],
          ['fab', 'twitter', 'text-twitter'],
          ['fab', 'facebook-f', 'text-facebook'],
          ['fas', 'question', 'default'],
        ],
      },
    },
  },
}

// We create a “template” of how args map to rendering
const Template = (args: Array<string>) => ({
  props: Object.keys(args),
  template: '<SocialButton :icon="icon" />',
})

export const Default = Template.bind({})
Default.args = { icon: ['fas', 'question', 'default'] }
