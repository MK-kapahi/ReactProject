import { useDispatch, useSelector } from "react-redux";
import {  searchUserBySearchString } from "../../../../Redux/Actions";
import './style.css'


export default function UserView({ setReceiver, currentUser , chatRoom }) {

    const dispatch = useDispatch();
    const data = useSelector(state => state?.setSearchedReducer?.payload)
    let userShow = data || []
    const searchUser = (event) => {
        let value = event.target.value
        let id = currentUser._id
        dispatch(searchUserBySearchString({ value , id }))
    }

    const initiateChat = (user) => {
        setReceiver(user)
        chatRoom(user)
        userShow.length = 0;
    }
    return (
        <>

            <section className="content">
                <div className="container p-0">

                    <h1 className="h3 mb-3">Messages</h1>

                    <div className="card">
                        <div className="row g-0">
                            <div className="col-12 ">

                                <div className="px-4 d-none d-md-block">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-grow-1">
                                            <input type="text" className="form-control my-3" placeholder="Search..." onChange={searchUser} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 ">
                                <div className="px-4 d-none d-md-block">
                                    {userShow.length ?
                                        userShow?.map((val) => {
                                            return (
                    

                                                <div key={val.id} className="showSearchedUser d-flex flex-column">
                                                    <button className="btn btn-light" type="button" onClick={() => initiateChat(val)}>

                                                        {val.name}
                                                    </button>
                                                </div>
                                            )
                                        })
                                        : " "
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >


        </>
    );
}