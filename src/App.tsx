import { useState } from 'react'
import * as z from "zod";
import './App.css'
import styles from "./styles.module.css"

const formDataSchema = z.object({
  name: z.string().min(3, { error: "Name must be at least 3 characters long" }).max(20, { error: "Name must be at most 20 characters long" }),
  email: z.email({ error: "Invalid email address" }),
  subject: z.enum(['general', 'support', 'sales', 'partnership', 'feedback'], { error: "Please select a valid subject" }),
  priority: z.enum(['low', 'medium', 'high'], { error: "Please select a priority level" }),
  message: z.string().max(500, { error: "Message must be at most 500 characters long" }).optional(),
});

const App = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [selectedPriority, setSelectedPriority] = useState('')
  const [error, setError] = useState<string>('')

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubject(e.target.value)
  }

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  const handlePriorityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPriority(e.target.value)
  }

  // const submitForm = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault()

  //   console.log('Form submitted:', { name, email, subject, message })

  //   setName('')
  //   setEmail('')
  //   setSubject('')
  //   setMessage('')
  // }

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // Prevent default form submission behavior

    const formData = { name, email, subject, message, priority: selectedPriority }
    console.log('formData', formData)

    // const parseResult = formDataSchema.safeParse(formData)
    try {
      const parseResult = formDataSchema.parse(formData)
      console.log('parseResult', parseResult)
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.issues?.[0]?.message)
        // const pretty = z.prettifyError(err);
        // console.log(pretty)
        // console.log('Validation errors:', err.errors);
        // setError(err.errors.map(e => e.message).join(', '))
        return
      }
      console.log('Unexpected error', err)
      setError('An unexpected error occurred')
      return
    }


    // if (name.length < 3 || name.length > 20) return setError('Name must be between 3 and 20 characters')

    // if (!email.includes('@') || !email.includes('.')) return setError('Please enter a valid email address')

    // if (['general', 'support', ''].includes(subject)) return setError('Please select a subject')

    // if (selectedPriority === '') return setError('Please select a priority level')

    // if ( message.length > 500) return setError('Message must be more than 500 characters')

    setName('')
    setEmail('')
    setSubject('')
    setMessage('')
    setSelectedPriority('')
    setError('')
  }

  return (
    <div className={styles.page}>
      <section className={styles.contactContent}>
        <div className={styles.container}>
          <div className={styles.contactGrid}>
            <div className={styles.contactFormSection}>
              <h2>Send us a Message</h2>
              {error && <p className={styles.errorText}>{error}</p>}
              <form
                onSubmit={submitForm}
                className={styles.contactForm}
              >
                <div className={styles.formGroup}>
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                    // required
                    placeholder="Enter your full name"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    // required
                    placeholder="Enter your email address"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    // required
                    value={subject}
                    onChange={handleSubjectChange}
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="sales">Sales Question</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Priority Level *</label>
                  <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="priority"
                        value="low"
                        checked={selectedPriority === 'low'}
                        onChange={handlePriorityChange}
                      />
                      Low
                    </label>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="priority"
                        value="medium"
                        checked={selectedPriority === 'medium'}
                        onChange={handlePriorityChange}
                      />
                      Medium
                    </label>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="priority"
                        value="high"
                        checked={selectedPriority === 'high'}
                        onChange={handlePriorityChange}
                      />
                      High
                    </label>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    // required
                    value={message}
                    onChange={handleMessageChange}
                    rows={6}
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className={`${styles.btn} ${styles.btnPrimary}`}
                // onClick={submitForm}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
