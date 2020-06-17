import React from "react";
import { connect } from 'react-redux';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { Alert } from '../IndependentComponents/Alert';
import { addUser, editUser, showAlert } from '../../redux/actions';
import Loader from '../IndependentComponents/Loader';

class UserForm extends React.Component {

  constructor(props) {
    super(props);

    const phoneRegExp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/

    this.validationSchema = Yup.object().shape({
      fio: Yup.string()
        .min(2, "*Names must have at least 2 characters")
        .max(100, "*Names can't be longer than 100 characters")
        .required("*Name is required"),
      tel: Yup.string()
        .matches(phoneRegExp, "*Phone number is not valid")
        .required("*Phone number required")
    });
  }

  render() {

    this.fio = '';
    this.tel = '';

    if(this.props.type == 'edit')
    {

      if(this.props.loading)
      {
        return <Loader />
      }

      if(!this.props.axiosUsers.length)
      {
        return (
          <div>
            No Users Found
          </div>
        )
      }

      this.fio = this.props.axiosUsers[0].fio;
      this.tel = this.props.axiosUsers[0].tel;
    }

    return (
      <div>

        { this.props.alert && <Alert params={this.props.alert} /> }

        <Formik
          initialValues={{ fio: this.fio, tel: this.tel }}
          validationSchema={this.validationSchema}
          onSubmit={(values, imperativeMethods) => {

            switch (this.props.type){
              case 'create':
                this.props.addUser( JSON.stringify(values), imperativeMethods);
                break;
              case 'edit':
                this.props.editUser( JSON.stringify({...values, id: this.props.axiosUsers[0].id }), imperativeMethods, this.props.axiosUsers[0].id);
                break;
            }

          }}
        >

        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (

              <form onSubmit={handleSubmit}>

                <fieldset>
                  <legend>
                    Edit form
                  </legend>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">
                      Full name
                    </label>
                    <input
                      type="text"
                      className={"form-control " + ((touched.fio && errors.fio) ? "is-invalid" : '')}
                      id="fullname"
                      name="fio"
                      aria-describedby="fullnameHelp"
                      placeholder="Enter fullname"

                      onChange={handleChange}

                      onBlur={handleBlur}

                      value={values.fio}

                    />
                    {touched.fio && errors.fio ? (
                       <div className="invalid-feedback">{errors.fio}</div>
                    ): null}
                    <small
                      id="fullnameHelp"
                      className="form-text text-muted"
                    >
                      Please enter your name, surname and patronymic in this field.
                    </small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">
                      Phone number
                    </label>
                    <input
                      type="text"
                      className={"form-control " + ((touched.tel && errors.tel) ? "is-invalid" : '')}
                      id="phone_number"
                      name="tel"
                      aria-describedby="phone_numberHelp"
                      placeholder="Enter phone number"

                      onChange={handleChange}

                      onBlur={handleBlur}

                      value={values.tel}
                    />
                    {touched.tel && errors.tel ? (
                       <div className="invalid-feedback">{errors.tel}</div>
                    ): null}
                    <small
                      id="phone_numberHelp"
                      className="form-text text-muted"
                    >
                      Please enter your phone number in this field.
                    </small>
                  </div>
                  <button disabled={isSubmitting} type="submit" className="btn btn-info">{ (this.props.type == 'edit') ? 'Update' : 'Create' }</button>
                </fieldset>
              </form>

          )
        }
        </Formik>
      </div>
    );

  }
}

const mapDispatchToProps = {
  showAlert,
  addUser,
  editUser
}

const mapStateToProps = state => ({
  axiosUsers: state.users.axiosUsers,
  alert: state.app.alert,
  loading: state.app.loading,
})

export default connect(mapStateToProps, mapDispatchToProps)(UserForm)
