import React from 'react'
import PrincipalHeader from './PrincipalHeader'
import PrincipalBody from './PrincipalBody'
import Teachers from '../Teacher/Teachers'
import Students from '../Student/Students'

const PrincipalView = () => {
  return (
    <div>
        <div>
            <PrincipalHeader/>
        </div>
        <div>
            <div className=''>
            <PrincipalBody/>
              <Teachers/>
              <Students/>
            </div>
        </div>
    </div>
  )
}

export default PrincipalView