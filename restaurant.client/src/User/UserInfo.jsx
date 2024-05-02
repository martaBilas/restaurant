import React from 'react'
import { Row } from 'react-bootstrap'
import CustomerInfoForm from '../UIElements/CustomerInfoForm'

const UserInfo = () => {
  return (
    <>
    < Row className="ps-3 pt-2">Change any info you need and click submit</Row>
      <CustomerInfoForm isCart={false}/>
    </>
  )
}

export default UserInfo