import { Story, Meta } from '@storybook/vue'
import SocialButton from '~/components/atoms/SocialButton.vue'

export default {
  title: 'Atoms/SocialButton',
  component: SocialButton,
  argTypes: {
    icon: {
      control: {
        type: 'select',
        options: [
          ['fab', 'github'],
          ['fab', 'twitter'],
          ['fab', 'facebook-f'],
          ['fas', 'question'],
        ],
      },
    },
    color: {
      control: {
        type: 'select',
        options: ['text-twitter', 'text-github', 'text-facebook'],
      },
    },
  },
} as Meta

const Template: Story = (args) => ({
  props: Object.keys(args),
  template: '<SocialButton :icon="icon" :color="color" />',
})

export const Default = Template.bind({})
Default.args = { icon: ['fas', 'question'], color: '' }
