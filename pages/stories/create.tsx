import CreateLayout from '../../layouts/stories/create'
import StoryForm from '../../components/form'

const CreateStory = () => (
  <div>
    <StoryForm />
  </div>
)

CreateStory.getLayout = (page) => <CreateLayout>{page}</CreateLayout>

export default CreateStory
