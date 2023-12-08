export function PaymentPage() {
    return (
        <>
            <section className="container">
                <div className="row">
                    <div className="col">
                        <div>
                            <h1> Payment Gateway </h1>
                        </div>
                        <form>
                            {/* <div className="mb-3 row">
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label" >Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control-plaintext" id="staticEmail" value={formFields.name} placeholder="abc..." onChange={(e) => validateInput("name", e.target.value, 15, ERROR_MESSAGES, formFieldsError, setFormFieldsErrors)} />
                        </div>
                        {formFieldsError.name ? <label name="text-danger">{formFieldsError.name}</label> : null}
                    </div> */}
                            <div className="mb-3 row d-flex">
                                <label className="col-sm-2 col-form-label">Name </label>
                                <input type="text" placeholder="name......" className="form-control-plaintext input-text" ></input>
                            </div>
                            <div className="mb-3 row d-flex">
                                <label className="col-sm-2 col-form-label">Contact Number </label>
                                <input type="text" placeholder="phone number......" className="form-control-plaintext input-text" ></input>
                            </div>
                            <div className="mb-3 row d-flex">
                                <label className="col-sm-2 col-form-label"> Address </label>
                                <textarea type="text" placeholder="adresss......" className="form-control-plaintext input-text" ></textarea>
                            </div>
                            <div className="mb-3 row d-flex justify-content-center">
                                <button type="button" className="buy_button">
                                    buy
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}