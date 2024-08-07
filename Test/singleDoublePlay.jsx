import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { KiteCombobox, useComboboxBehavior, KiteComboboxListItem, KiteSelect, boldSubstring, KiteIcon } from "@kite/react-kite";
import MultiSelectOption from "./MultiSelectOption";
function SingleDoublePlay(props) {
    const [customData, setCustomData] = useState([]);

    const groupByUniqueId = () => {
        const data = {};
        props.optionResponsesDetail.customComponent.forEach(cObj => {
            let existRecord = true;
            if (cObj.columnName === "Line_Of_Business") {
                let record = props?.lineOfBusiness?.[props.accordianName].find(obj => ((typeof cObj.userInput === 'string' && obj.key === cObj.userInput) || (typeof cObj.userInput === 'object' && cObj.userInput.find(childObj => childObj.value === obj.key))));
                if (!record) {
                    existRecord = false;
                }
            }
            if (cObj.columnName === "Products") {
                let record = props?.products?.[props.accordianName].find(obj => ((typeof cObj.userInput === 'string' && obj.key === cObj.userInput) || (typeof cObj.userInput === 'object' && cObj.userInput.find(childObj => childObj.value === obj.key))));
                if (!record) {
                    existRecord = false;
                }
            }
            if (!existRecord) {
                cObj.userInput = '';
            }
        });


        props.optionResponsesDetail.customComponent.forEach(customObj => {
            if (customObj.grouping && customObj.active) {
                if (!data[customObj.grouping]) {
                    data[customObj.grouping] = {
                        lineOfBusiness: JSON.parse(JSON.stringify(props?.lineOfBusiness?.[props.accordianName])),
                        products: JSON.parse(JSON.stringify(props?.products?.[props.accordianName]))
                    };
                }
                if (customObj.columnName === "Line_Of_Business") {
                    if (typeof customObj.userInput === 'string') {
                        data[customObj.grouping].lineOfBusiness.forEach(bOBj => {
                            if (customObj.userInput === bOBj.key) {
                                bOBj.value = 'True'
                            }
                        });
                    } else {
                        data[customObj.grouping].lineOfBusiness.forEach(bOBj => {
                            let index = customObj.userInput.find(cobj => cobj.value === bOBj.key);
                            if (index) {
                                bOBj.value = 'True';
                            }
                        });
                    }
                }
                if (customObj.columnName === "Products") {
                    if (typeof customObj.userInput === 'string') {
                        data[customObj.grouping]['products'].forEach(pOBj => {
                            if (customObj.userInput === pOBj.key) {
                                pOBj.value = 'True';
                            }
                        });
                    } else {
                        data[customObj.grouping].products.forEach(pOBj => {
                            let index = customObj.userInput.find(cobj => cobj.value === pOBj.key);
                            if (index) {
                                pOBj.value = 'True';
                            }
                        });
                    }
                }
                data[customObj.grouping][customObj.columnName] = { ...customObj, "userInput": customObj.userInput ? customObj.userInput : [] };
            }
        })
        const dataList = Object.values(data);
        setCustomData(dataList)
    }

    const addNewCustomQue = () => {
        let grouping = Date.now();
        const data = [...customData];
        let newBusinness = props?.lineOfBusiness?.[props.accordianName].map(bObj => {
            return { ...bObj, "value": "False" }
        })
        let newproducts = props?.products?.[props.accordianName].map(pObj => {
            return { ...pObj, "value": "False" }
        })
        data.push({
            "lineOfBusiness": newBusinness,
            "products": newproducts,
            "Line_Of_Business": {
                "userInput": [],
                "uniqueId": `${grouping}Line_Of_Business`,
                "grouping": grouping,
                "parentId": props.optionResponsesDetail.customComponent[0]['parentId'],
                "fieldType": "Single-Drop-Down",
                "databaseName": "",
                "databaseField": "",
                "componentType": "Dynamic-Table",
                "columnName": "Line_Of_Business",
                "active": true
            },
            "Products": {
                "userInput": [],
                "uniqueId": `${grouping}Products`,
                "grouping": grouping,
                "parentId": props.optionResponsesDetail.customComponent[0]['parentId'],
                "fieldType": "Single-Drop-Down",
                "databaseName": "",
                "databaseField": "",
                "componentType": "Dynamic-Table",
                "columnName": "Products",
                "active": true
            },
        });
        props.optionResponsesDetail.customComponent.push({
            "userInput": [],
            "uniqueId": `${grouping}Line_Of_Business`,
            "grouping": grouping,
            "parentId": props.optionResponsesDetail.customComponent[0]['parentId'],
            "fieldType": "Single-Drop-Down",
            "databaseName": "",
            "databaseField": "",
            "componentType": "Dynamic-Table",
            "columnName": "Line_Of_Business",
            "active": true
        });
        props.optionResponsesDetail.customComponent.push({
            "userInput": [],
            "uniqueId": `${grouping}Products`,
            "grouping": grouping,
            "parentId": props.optionResponsesDetail.customComponent[0]['parentId'],
            "fieldType": "Single-Drop-Down",
            "databaseName": "",
            "databaseField": "",
            "componentType": "Dynamic-Table",
            "columnName": "Products",
            "active": true
        });
        setCustomData(data);
    }

    const removeCustomQue = (grouping) => {
        const newData = props.optionResponsesDetail.customComponent.map(obj => {
            if (obj.grouping === grouping) {
                obj['active'] = false;
            }
            return obj;
        });
        props.optionResponsesDetail.customComponent = newData;
        setCustomData(customData.filter(obj => obj?.["Line_Of_Business"]?.grouping !== grouping && obj?.["Products"]?.grouping !== grouping));
    }

    const changeSelection = (grouping, value, selectedObj, index, type) => {
        let valueList = [];
        const data = [...customData];
        data.forEach(obj => {
            if (obj[type].grouping === grouping) {
                if (typeof obj[type]['userInput'] === 'string') {
                    obj[type]['userInput'] = [{
                        "value": obj[type].userInput, "uniqueId": obj[type].uniqueId
                    }]
                }
                if (value === 'True') {
                    obj[type]['userInput'].push({
                        "value": selectedObj.key, "uniqueId": Date.now() + type
                    })
                    valueList = obj[type]['userInput'];
                } else {
                    valueList = obj[type]['userInput'].filter(newObj => newObj.value !== selectedObj.key);
                    obj[type]['userInput'] = valueList;
                }
                let listType = type === 'Line_Of_Business' ? 'lineOfBusiness' : 'products';
                obj[listType] = obj[listType].map(lObj => {
                    return lObj.uniqueId === selectedObj.uniqueId ? { ...lObj, "value": value } : lObj
                });
            }
        });
        props.optionResponsesDetail.customComponent.forEach(custObj => {
            if (custObj.grouping === grouping && custObj.columnName === type) {
                custObj['userInput'] = valueList;
            }
        });
        setCustomData(data);
        console.log('optionResponsesDetail', props.optionResponsesDetail)
        console.log('data', data)
    }

    const toggleAllHandlerForBusiness = (value, grouping, index, type) => {
        const data = [...customData];
        let valueList = [];
        data.forEach(obj => {
            if (obj[type].grouping === grouping) {
                valueList = value ? (type === 'Line_Of_Business' ? obj.lineOfBusiness : obj.products).map(obj => {
                    return { "value": obj.key, "uniqueId": Date.now() + type };
                }) : [];
                obj[type]['userInput'] = valueList;
                let listType = type === 'Line_Of_Business' ? 'lineOfBusiness' : 'products';
                obj[listType] = obj[listType].map(lObj => {
                    return { ...lObj, "value": value ? "True" : "False" }
                })
            }
        });
        props.optionResponsesDetail.customComponent.forEach(custObj => {
            if (custObj.grouping === grouping && custObj.columnName === type) {
                custObj['userInput'] = valueList;
            }
        });
        setCustomData(data);
        console.log('optionResponsesDetail', props.optionResponsesDetail)
        console.log('data', data)
    }

    useEffect(() => {
        groupByUniqueId();
    }, [props?.products?.[props.accordianName]]);

    useEffect(() => {
        groupByUniqueId();
    }, [props?.lineOfBusiness?.[props.accordianName]]);


    return (
        <table className="single-double-play" cellPadding={'5px'} cellSpacing={'5px'}>
            <tbody>
                <tr>
                    <td style={{ textAlign: 'center' }}>Line of Business</td>
                    <td style={{ textAlign: 'center' }}>Products</td>
                    <td></td>
                </tr>
                {
                    customData.map((obj, index) =>
                        <tr key={'single-double' + props.optionResponsesDetail?.uniqueId + index}>
                            <td>
                                <MultiSelectOption
                                    label=""
                                    options={obj?.lineOfBusiness || []}
                                    toggleAllHandler={(value) => toggleAllHandlerForBusiness(value, obj['Line_Of_Business'].grouping, index, 'Line_Of_Business')}
                                    changeSelection={(uniqueId, value, key) => changeSelection(obj['Line_Of_Business']?.grouping, value, key, index, 'Line_Of_Business')} />
                            </td>
                            <td style={{ paddingLeft: '1rem' }}>
                                <MultiSelectOption
                                    label=""
                                    options={obj?.products || []}
                                    toggleAllHandler={(value) => toggleAllHandlerForBusiness(value, obj['Products'].grouping, index, 'Products')}
                                    changeSelection={(uniqueId, value, key) => changeSelection(obj['Products']?.grouping, value, key, index, 'Products')} />
                            </td>

                            <td style={{ paddingLeft: '10px', textAlign: 'end' }}>
                                {index === customData?.length - 1 ? (
                                    <KiteIcon
                                        ariaLabel=""
                                        badge=""
                                        className=""
                                        fill="#008516"
                                        icon="ki-plus-circle-f"
                                        title="Edit"
                                        offset="10"
                                        inline="true"
                                        size="1.5rem"
                                        onClick={() => addNewCustomQue(index)}
                                        style={{ marginRight: '2px', marginLeft: '10px' }}
                                    />
                                ) : ("")}
                                {customData?.length === 1 ? ("") : (
                                    <KiteIcon
                                        ariaLabel=""
                                        badge=""
                                        className=""
                                        fill="red"
                                        icon="ki-minus-circle-f"
                                        title="Edit"
                                        offset="10"
                                        inline="true"
                                        size="1.5rem"
                                        onClick={() => removeCustomQue(obj['Line_Of_Business'].grouping)}
                                        style={{ marginRight: '10px', marginLeft: '2px' }}
                                    />
                                )}
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
}

export default SingleDoublePlay;

