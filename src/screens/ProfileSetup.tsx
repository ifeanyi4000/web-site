import OnboardProfile from '../components/setupProfile/OnboardProfile'

type Props = {}

export default function ProfileSetup({ }: Props) {

  return (
    <>
      <div className='relative'>
        <div className='bg-gray-900'>
          <div className='max-container items-center padding-container pb-11 justify-between lg:justify-between flex flex-col lg:flex-row'>
            <OnboardProfile />
          </div>
        </div>
      </div>
    </>
  )
}