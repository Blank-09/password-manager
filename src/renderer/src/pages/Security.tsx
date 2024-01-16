import React from 'react'
import { useNavigate } from 'react-router-dom'

const PASSWORD = import.meta.env.VITE_APP_PASSWORD || '111111'

const Security = () => {
  const navigate = useNavigate()

  const [form, setForm] = React.useState({
    type: 'pin',
    password: '',
    showPassword: false,
    isWrong: false,
    isSubmitted: false,
    attempts: 5
  })

  if (form.type === 'pin' && form.password.length === 6 && !form.isSubmitted) {
    submit()
  }

  function submit() {
    const isPasswordWrong = PASSWORD !== form.password

    setForm((prev) => ({
      ...prev,
      attempts: prev.attempts - (isPasswordWrong ? 1 : 0),
      password: '',
      isWrong: isPasswordWrong,
      isSubmitted: PASSWORD == prev.password
    }))

    if (PASSWORD == form.password) {
      document.body.classList.remove('wrong')
      localStorage.setItem('login', '1')
      setTimeout(() => {
        navigate('/accounts')
      }, 100)
    } else {
      document.body.classList.add('wrong')
    }
  }

  function onChangeHandler(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target! as HTMLInputElement

    if (form.type === 'pin') {
      target.value = target.value.trim()
      if (isNaN(+target.value)) return
    }

    setForm((prev) => ({
      ...prev,
      password: target.value
    }))
  }

  function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  return (
    <section className={'w-full h-full flex flex-col items-center justify-center select-none'}>
      {form.isSubmitted ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-x-2 border-gray-800 dark:border-emerald-400"></div>
        </div>
      ) : (
        <>
          <h1 className="text-4xl font-semibold mb-5">Security Pin</h1>

          <form className="h-1/3" onSubmit={onSubmitHandler}>
            <div className="flex relative">
              <input
                type="password"
                autoFocus={true}
                maxLength={6}
                onChange={onChangeHandler}
                disabled={form.attempts <= 0}
                value={form.password}
                className={
                  'absolute bg-transparent text-gray-950 text-4xl font-bold ps-4 top-1 w-[360px] outline-none'
                }
                style={{
                  letterSpacing: '45px'
                }}
              />
              <div className="flex space-x-2">
                <div className="rounded p-6 border-2 bg-white"></div>
                <div className="rounded p-6 border-2 bg-white"></div>
                <div className="rounded p-6 border-2 bg-white"></div>
                <div className="rounded p-6 border-2 bg-white"></div>
                <div className="rounded p-6 border-2 bg-white"></div>
                <div className="rounded p-6 border-2 bg-white"></div>
              </div>
            </div>

            <p
              className={
                'text-sm text-center text-gray-500 mt-2' +
                (form.isWrong ? ' opacity-100' : ' opacity-0')
              }
            >
              <span className="me-2">Wrong Pin</span>
              {form.attempts > 0 ? (
                <span className="text-red-500">({form.attempts} attempts left)</span>
              ) : (
                <span className="text-red-500">Try Again Later!</span>
              )}
            </p>
          </form>
        </>
      )}
    </section>
  )
}

export default Security
