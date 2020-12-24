import { Story, Meta } from '@storybook/vue'
import Button from '~/components/atoms/Button.vue'

export default {
  title: 'Atoms/Button',
  component: Button,
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
  },
} as Meta

const Template: Story = (args) => ({
  props: Object.keys(args),
  template: '<Button :is-loading="isLoading" :icon="icon">Button</Button>',
})

export const Default = Template.bind({})
Default.args = { icon: undefined, isLoading: false }

export const WithIcon = Template.bind({})
WithIcon.args = { icon: ['fas', 'question'], isLoading: false }

export const IsLoading = Template.bind({})
IsLoading.args = { icon: undefined, isLoading: true }

export const IsLoadingWithIcon = Template.bind({})
IsLoadingWithIcon.args = { icon: ['fas', 'question'], isLoading: true }
