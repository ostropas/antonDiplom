import React, { Component } from "react";
import MainContainer from "../../../containers/layout.jsx";
import methodsApi from "../../../api/methods";

let SearchingString = "";
class MethodsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            methods: [{
                id:-1,
                title:"",
                description:""
            }]
        };
    }

    // eslint-disable-next-line class-methods-use-this
    componentWillMount() {
        if (localStorage.getItem("authToken") === null) {
            alert("You aren't authenticated");
            window.location.href = "/auth/login";
        }
    }

    // eslint-disable-next-line class-methods-use-this
    redirectToPlayer(id) {
        window.location.href = "/methods/" + id;
    }

    search() {
        if (SearchingString.value === "" || SearchingString.value === " ") {
            this.setState({
                methods: []
            });
            return;
        }

        let searchingString = SearchingString.value === "~1" ? "" : SearchingString.value;
        methodsApi.searchMethod(searchingString).then((response) => {            
            this.setState({
                methods: response.data
            });
        });
    }


    render() {        
        return (
            <MainContainer>
                <div className="container">
                    <div className="row justify-content-md-center mt-3"><h4>Поиск по методам</h4></div>
                    <div className="row">
                                <div className="col-12">
                                    <input className="form-control" type="text" name="SearchingString"
                                        id="search-SearchingString" ref={(input) => { SearchingString = input; }}
                                        onChange={(e) => { this.search(); }}></input>
                                </div>
                    </div>
                    < br />
                    <div className="form-row">
                        <button className="btn btn-primary"
                            onClick={() => { window.location.href = "methods/new"; }}>Создать новый метод</button>
                    </div>
                    < br />
                    <div className="row">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>Название метода</th>
                                    <th>Описание</th>
                                </tr>
                                {this.state.methods.map((item, index) => (
                                    <tr key={index} style={{ cursor: "pointer" }} onClick={() => { this.redirectToPlayer(item.id); }}>
                                        <td>{item.title}</td>
                                        <td>{item.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </MainContainer>
        );
    }
}

export default MethodsPage;
