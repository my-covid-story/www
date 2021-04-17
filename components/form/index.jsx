import s from './form.module.css'

export default function StoryForm() {
  return (
    <form className={s.storyForm}>
      <div className={s.field}>
        <label className={s.label} for="story">
          Story
        </label>
        <textarea name="story" />
      </div>
      <div className={s.field}>
        <label className={s.label} for="postal">
          Postal code
          <input type="text" name="postal" />
        </label>
      </div>
      <div className={s.field}>
        <label className={s.label} for="photos">
          Upload your photo
        </label>
        <input type="file" id="photos" name="photos" multiple />
      </div>
    </form>
  )
}
