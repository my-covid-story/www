import s from './form.module.css'

export default function StoryForm() {
    return (
        <form className={s.storyForm}>
            <div className={s.field}>
                <label className={s.label} htmlFor="story">
                    Story
                </label>
                <textarea name="story" />
            </div>
            <div className={s.field}>
                <label className={s.label} htmlFor="postal">
                    Postal code
                    <input type="text" name="postal" />
                </label>
            </div>
            <div className={s.field}>
                <label className={s.label} htmlFor="photos">
                    Upload your photo
                </label>
                <input type="file" id="photos" name="photos" multiple />
            </div>
        </form>
    )
}
