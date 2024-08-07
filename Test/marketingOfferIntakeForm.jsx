import React, { useState, useEffect, useRef } from 'react'
import TextArea from './textArea';
import './marketingOfferIntakeForm.css'
import CheckBox from './checkbox';
import RadioButton from './radioButton';
import { KiteGrid, KiteGridCell, KiteCard, KiteTooltip, KiteIcon, KiteDialog, KiteAccordion, KiteAccordionRow, KiteBadge, KiteButton, KiteCheckbox, KiteProgressIndicator, KiteTabs, KiteTab, KiteAlert } from '@kite/react-kite';
import { KiteDataTable, KiteTableHeader, KiteColumn, KiteRow, KiteCell } from '@kite/react-kite';
import MultiSelectOption from './MultiSelectOption';
import MarketingOfferIntakeLinkedQuestion from './marketingOfferIntakeLinkedQuestion';
import useHttp from '../../../hooks/useHttp';
import { useNavigate } from 'react-router-dom';
import { useKeyClockContext } from '../../../hooks/useAuthContext';
import mockRes from '../oih-mocked-data/Questionform2.json';
import { useSelector } from 'react-redux';
import useMarketingOfferIntakeForm from '../../../hooks/useMarketingOfferIntakeForm';
import { FileDrop } from './marketingOfferIntakeFileUpload';
import "./multiSelect.css";
import MarketingBdsOverview from './marketingBdsOverview';
import MarketingBdsAttachments from './marketingBdsAttachments';

function MarketingOfferIntakeForm(props) {
    const [serverError, setHttpRequest] = useHttp();
    const [data, setData] = useState([]);
    const [origionalQue, setOrigionalQue] = useState([]);
    const [totalLinkedQuestion, setTotalLinkedQuestion] = useState([]);
    const [totalQuestion, setTotalQuestion] = useState(0);
    const [totalAnsweredQuestion, setTotalAnsweredQuestion] = useState(0);
    const [totalPercentage, setTotalPercentage] = useState(0);
    const [questionnaire, setQuestionnaire] = useState([]);
    const [parentQueUniqueId, setParentQueUniqueId] = useState({});
    const [lastUncheckedKey, setLastUncheckedKey] = useState('');
    const [lastUncheckedTitle, setLastUncheckedTitle] = useState('');
    const [lastUncheckedDetail, setLastUncheckedDetail] = useState({});
    const [dataLostPopup, setDataLostPopup] = useState(false);
    let parentChkIds = [];
    const [isOpen, setIsOpen] = useState(false);
    const [Open, setOpen] = useState(false);
    const [invalidQuePopup, setInvalidQuePopup] = useState(false);
    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [saveMsg, setSaveMsg] = useState('');
    const [dialogItem, setDialogItem] = useState({});
    const [dialogQuestionItem, setDialogQuestionItem] = useState([]);
    const [queCreateTime, setQueCreateTime] = useState("");
    const [saveForLaterClick, setSaveForLaterClick] = useState(false);
    const [showAlert, setShowAlert] = React.useState(false);
    const [statusFlagData, setStatusFlag] = React.useState('');
    const [versionId, setVersionId] = React.useState('');
    const [invalidQueList, setInvalidQueList] = useState([]);
    const [securityList, setSecurityList] = useState([]);
    const [lineOfBusiness, setLineOfBusiness] = useState({});
    const [products, setProducts] = useState({});
    let uiPage = '';
    const authenticatedData = useKeyClockContext();
    const userId = (authenticatedData.keyClockValue
        ? authenticatedData.keyClockValue.tokenParsed
        : {}).sAMAccountName;
    const [readAccess, writeAccess] = useMarketingOfferIntakeForm();
    if (!writeAccess && !readAccess) {
        navigate('/central-dashboard');
    }
    let no = 0;
    const [ruleData, setRuleData] = useState({
        'residential': [],
        'smb': []
    });
    const [expandedAccordionRows, setExpandedAccordionRows] = useState([]);

    const fetchTableData = async () => {
        try {
            setHttpRequest(
                {
                    method: "GET",
                    url: process.env.BUSINESS_RULES,
                    action: (response) => {
                        let residentialRule = [];
                        let smbRule = [];
                        if (response && response.length) {
                            response.forEach(rule => {
                                let bdsNumberList = rule.bdsNumber ? rule.bdsNumber.split(',') : [];
                                let bdsArr = bdsNumberList.map(val => val.trim());
                                if (bdsArr.indexOf(props.data?.bdsNumber.slice(4)) > -1) {
                                    if (rule.customerSegment === 'Residential') {
                                        residentialRule.push(rule);
                                    }
                                    if (rule.customerSegment === 'Residential,SCS') {
                                        residentialRule.push(rule);
                                    }
                                    if (rule.customerSegment === 'Residential,SMB' || rule.customerSegment === 'SMB' || rule.customerSegment === 'SMB, Residential') {
                                        residentialRule.push(rule);
                                        smbRule.push(rule);
                                    }
                                    if (rule.customerSegment === 'Residential,SMB,SCS' || rule.customerSegment === 'SMB,Residential,SCS') {
                                        residentialRule.push(rule);
                                        smbRule.push(rule);
                                    }
                                }
                            });
                            setRuleData({
                                'residential': residentialRule,
                                'smb': smbRule
                            })
                        }
                    }
                }
            );
        } catch (error) {
            console.log(serverError, error);
            setLoading(false);
        }
    };
    const [currentAccordionRow, setCurrentAccordionRow] = React.useState([]);
    const onChange = (expandedRow) => {
        setCurrentAccordionRow((expandedRow === null ? -1 : expandedRow) + 1);
    };


    // Preview the question on dialog
    const openLinkedQuestionDialog = (item) => {
        setShowAlert(false);
        handleLinkedQuestionPreview(true);
        item.userQuestions = (item?.userQuestions || []).map(obj => {
            const newObj = { ...obj };
            newObj['editMode'] = false;
            return { ...newObj }
        })
        const queArr = item?.userQuestions ? JSON?.parse(JSON?.stringify(item?.userQuestions)) : [];
        setDialogItem(item);
        setDialogQuestionItem(queArr);
    }

    const concatenateArrays = (obj) => {
        let result = [];
        for (let key in obj) {
            if (Array.isArray(obj[key])) {
                result = result.concat(obj[key]);
            }
        }
        return result;
    }

    const fetchData = async () => {
        try {
            setHttpRequest(
                {
                    method: "POST", url: process.env.OFFICE_IN_HOUR_QUESTIONNAIRE,
                    body: {
                        "bdsNumber": props.data?.bdsNumber,
                        "userId": userId,
                        "questionnaireName": "Marketing offers intake_questionnaire"
                    },
                    action: (dataObj) => {
                        // dataObj = mockRes;
                        setQueCreateTime(dataObj?.createdDateTime);
                        setStatusFlag(dataObj?.statusFlag);
                        setVersionId(dataObj?.versionId);
                        let apiData = dataObj?.questionnaire || [];
                        if (apiData?.[0]) {
                            // During the initial form starting setting project description as value of first question.
                            if (!apiData[0].optionResponses[0].value || apiData[0].optionResponses[0].value.length === props.data?.projectDescription.length) {
                                apiData[0].optionResponses[0].value = props.data?.projectDescription;
                            }
                            if (apiData?.[0]?.optionResponses?.[1]) {
                                apiData[0].optionResponses[1].alwaysRender = 'False';
                                for (let m = 0; m < apiData[0].optionResponses[1].optionResponses.length; m++) {
                                    apiData[0].optionResponses[1].optionResponses[m].alwaysRender = 'False';
                                }
                            }
                            apiData[0]['queIndex'] = 1;
                        }
                        let totalLinkQue = 2;
                        let parentIds = {};
                        if (apiData?.[1]) {
                            apiData[1]['queIndex'] = 2;
                            let numberIndex = 3;
                            let lineOfBusinessObj = { ...lineOfBusiness };
                            let productObj = { ...products };
                            apiData[1]?.optionResponses?.forEach(obj => {
                                // start setting the current tab, all tabs and question index.
                                let allTabs = [];
                                let tabLable = '';
                                let requiredTabObj = {};
                                let accordianName = obj.key;
                                parentIds[obj.uniqueId] = obj.key;
                                if (obj?.questionResponses?.length) {
                                    // Grouping the question based on questionGroup key.
                                    const groupObj = Object.groupBy(obj.questionResponses, ({ questionGroup }) => questionGroup);
                                    obj.questionResponses = concatenateArrays(groupObj);
                                    if (obj.value === 'True') {
                                        totalLinkQue += obj.questionResponses?.length;
                                    }
                                    // Child question iteration
                                    obj?.questionResponses.forEach(queObj => {
                                        if (obj.value === 'True') {
                                            queObj['queIndex'] = numberIndex;
                                            numberIndex++;
                                        }
                                        let tabName = queObj.questionGroup;
                                        if (!tabLable) {
                                            tabLable = tabName;
                                        }
                                        if (allTabs.indexOf(tabName) < 0) {
                                            allTabs.push(tabName);
                                        }
                                        if (queObj?.required) {
                                            requiredTabObj[tabName] = true;
                                        }
                                        if (queObj.question === "What line of business is this impacting? (Select all that apply)") {
                                            const lineOfBusinessList = [];
                                            let productList = [];
                                            queObj.optionResponses.forEach(subQueObj => {
                                                if (subQueObj.value === 'True' && subQueObj.key !== "Mobile") {
                                                    lineOfBusinessList.push({
                                                        ...subQueObj,
                                                        value: 'False'
                                                    });
                                                    subQueObj.optionResponses.forEach(proObj => {
                                                        if (proObj.value === 'True' && proObj.key !== "New") {
                                                            productList.push({
                                                                ...proObj,
                                                                value: 'False'
                                                            });
                                                        }
                                                        if (proObj.value === 'True' && proObj.key === "New") {
                                                            productList.push({
                                                                ...proObj.optionResponses[0],
                                                                value: 'False'
                                                            });
                                                        }
                                                    })
                                                }
                                            });
                                            lineOfBusinessObj[accordianName] = lineOfBusinessList;
                                            productObj[accordianName] = productList;
                                        }
                                    })
                                    //Added the new Tab manually for both smb & residential
                                    allTabs.push('Selected Requirements');
                                }
                                obj.tabLable = tabLable;
                                obj.currentTabs = 0;
                                obj.tabs = allTabs;
                                obj.requiredTabObj = requiredTabObj;
                                // end setting the current tab, all tabs and question index.
                            });
                            setLineOfBusiness(lineOfBusinessObj);
                            setProducts(productObj);
                        }
                        setData(JSON?.parse(JSON?.stringify(apiData)));
                        setParentQueUniqueId(parentIds);
                        setTotalLinkedQuestion(totalLinkQue);
                        setOrigionalData(apiData);
                        setLoading(false);
                    }
                }
            );
        } catch (error) {
            console.log(serverError, error);
            setLoading(false);
        }
        // Mock the Data
        // let dataObj = mockRes.questionnaire;
        // if (dataObj?.[0]?.optionResponses?.[0]) {
        //     dataObj[0].optionResponses[0].value = props.data?.projectDescription;
        // }
        // setData(JSON?.parse(JSON?.stringify(dataObj)));
        // setOrigionalQue(JSON?.parse(JSON?.stringify(dataObj)));
        // let totalLinkQue = 2;
        // dataObj?.[1]?.optionResponses?.forEach(obj => {
        //     if (obj.value === 'True' && obj?.questionResponses?.length) {
        //         totalLinkQue += obj.questionResponses?.length;
        //     }
        // })
        // setTotalLinkedQuestion(totalLinkQue)
    };

    const resetNestedObj = (array) => {
        for (let i = 0; i < array?.length; i++) {
            const currentObject = array[i];
            if (currentObject.value || currentObject?.btnType === "Text-Box" || currentObject?.btnType === "Text") {
                if (["Radio-Button", "Multi-Drop-Down", "Check-Box"].indexOf(currentObject?.btnType) > -1) {
                    currentObject['value'] = 'False';
                }
                if (currentObject?.btnType === "Text" || currentObject?.btnType === "Text-Box") {
                    currentObject['value'] = '';
                }
            }
            if (currentObject['userQuestions']?.length) {
                currentObject['userQuestions'] = [];
            }

            if (currentObject?.optionResponses?.length) {
                resetNestedObj(currentObject?.optionResponses)
            }
            if (currentObject?.questionResponses?.length) {
                resetNestedObj(currentObject?.questionResponses)
            }
        }
        return array;
    }

    const setOrigionalData = (apiData) => {
        const dataStr = JSON?.parse(JSON?.stringify(apiData));
        let updatedArr = resetNestedObj(dataStr);
        setOrigionalQue(updatedArr);
        setTotalQuestionAnswerValue(apiData, updatedArr);
    }

    const handleLinkedQuestionPreview = (value) => {
        setOpen(value);
    }

    const handleDialogChange = (value) => {
        setIsOpen(value);
    }

    const validateQuestion = (value) => {
        let isAllMendatoryQueAnswered = verifyMandatoryQue();
        if (!isAllMendatoryQueAnswered) {
            setInvalidQuePopup(true);
        } else {
            handleDialogChange(value);
        }
    }


    const renderInvalidQue = () => {
        const cnt = 1;
        return (
            <div>
                {
                    invalidQueList.map((queObj, index) =>
                        <div className='invalid-que' key={'invalid-que' + queObj.queIndex}>
                            <span style={{ color: 'red', paddingRight: '2px' }}>* </span> {queObj.queIndex}. {queObj.question}
                        </div>
                    )}
            </div>
        )
    }

    const verifiedChildQuestionAnswered = (childArr) => {
        let validQue = false;
        childArr.forEach(obj => {
            if (obj.value !== 'False' && obj.value !== '') {
                validQue = true;
            }
        });
        return validQue;
    }

    const verifyMandatoryQue = () => {
        let invalidQue = []
        data.forEach(obj => {
            if (obj.required && obj.optionResponses.length) {
                let validQue = false;
                obj.optionResponses.forEach(childObj => {
                    if (childObj.value !== 'False' && childObj.value !== '') {
                        validQue = true;
                    }
                })
                if (!validQue) {
                    invalidQue.push({
                        'queIndex': obj.queIndex,
                        'question': obj.question
                    })
                }
            }
        });
        data?.[1]?.['optionResponses'].forEach(childObj => {
            if (childObj.value === 'True' && childObj.questionResponses.length) {
                childObj.questionResponses.forEach(queObj => {
                    if (queObj.required && queObj.optionResponses.length) {
                        let validQue = verifiedChildQuestionAnswered(queObj.optionResponses);
                        if (!validQue) {
                            invalidQue.push({
                                'queIndex': queObj.queIndex,
                                'question': queObj.question
                            })
                        }
                    }
                })
            }
        })
        setInvalidQueList(invalidQue);
        return invalidQue.length ? false : true;
    }


    const updateCustomComponent = async (optionObj) => {
        if (!optionObj.optionResponses.length && optionObj?.customComponent.length) {
            let newCustomArray = [];
            optionObj.customComponent.forEach(customObj => {
                if (customObj.active) {
                    if (typeof customObj.userInput === 'object' && customObj.userInput && customObj.userInput.length) {
                        customObj.userInput.forEach(userInputObj => {
                            newCustomArray.push({ ...customObj, "userInput": userInputObj.value, "uniqueId": userInputObj.uniqueId })
                        })
                    } else {
                        newCustomArray.push({ ...customObj })
                    }
                }
            })
            optionObj.customComponent = newCustomArray;
        } else {
            optionObj.optionResponses.forEach(newObj => {
                updateCustomComponent(newObj);
            })
        }
    }

    const saveForLater = async () => {
        setLoading(true)
        setSaveMsg('Saving the form')
        setIsOpen(false)
        data[1]['optionResponses'].forEach(optionObj => {
            optionObj.questionResponses.forEach(obj => {
                if (obj.question === 'What audience are we targeting? (Select all that apply)') {
                    obj.optionResponses.forEach(optionObj => {
                        updateCustomComponent(optionObj)
                    })
                }
            })
        })
        try {
            let bodyObj = {
                "offerId": "",
                "milestoneId": totalPercentage,
                "userId": userId,
                "bdsId": props.data?.bdsNumber,
                "offerName": "",
                "projectName": props.data?.projectName,
                "questionnaireName": 'Marketing offers intake_questionnaire',
                "statusFlag": `${totalPercentage === 100 && !saveForLaterClick ? 'COMPLETED' : 'INPROGRESS'}`,
                "createdBy": userId,
                "createdDateTime": queCreateTime,
                "questionnaire": data,
                "versionId": versionId
            };
            await setHttpRequest(
                {
                    method: "POST",
                    url: process.env.OFFICE_IN_HOUR_POST_QUESTIONNAIRE,
                    body: bodyObj,
                    action: (apiData) => {
                        setSaveForLaterClick(false);
                        fetchData();
                    }
                }
            );
        } catch (error) {
            console.error('Error updating data:', error);
            setSaveForLaterClick(false);
        }

        navigate('/marketing-offer-intake')
        setLoading(false)
    };

    const getOrigionalObj = (array, uniqueId) => {
        for (let i = 0; i < array?.length; i++) {
            const currentObject = array[i];
            if (currentObject?.uniqueId && currentObject?.uniqueId === uniqueId) {
                return currentObject;
            } else if (currentObject?.optionResponses || currentObject?.questionResponses) {
                let quesObj = getOrigionalObj(currentObject?.optionResponses?.length ? currentObject?.optionResponses : currentObject?.questionResponses, uniqueId);
                if (Object.keys(quesObj)?.length) {
                    return quesObj;
                }
            }
        }
        return {};
    }

    const updateNestedParent = (array, targetKey, newValue, parent, origionalCurrent) => {
        for (let i = 0; i < array?.length; i++) {
            const currentObject = array[i];
            if (currentObject?.uniqueId && currentObject?.uniqueId === targetKey) {
                parent['value'] = newValue;
                updateNestedParent(origionalCurrent ? origionalCurrent : array, parent.uniqueId, newValue, array[i])
                return true;
            } else if (currentObject?.optionResponses || currentObject?.questionResponses) {
                if (updateNestedParent(currentObject?.optionResponses?.length ? currentObject?.optionResponses : currentObject?.questionResponses, targetKey, newValue, array[i], origionalCurrent ? origionalCurrent : array)) {
                    return true;
                }
            }
        }
        return false;
    }

    const parentChecked = (current, keys) => {
        for (let k = 0; k < keys?.length; k++) {
            updateNestedParent(current, keys[k], 'True');
        }
        parentChkIds = [];
    }

    const replaceObjectById = (array, targetKey, newValue, parent = null, multiselectAction, newOptionValue) => {
        if (parent.uiPage) {
            uiPage = parent.uiPage;
        }
        for (let i = 0; i < array?.length; i++) {
            const currentObject = array[i];
            if ((currentObject?.uniqueId && currentObject?.uniqueId === targetKey || (currentObject?.queIndex && currentObject?.queIndex === targetKey && multiselectAction))) {
                if (array?.[0]?.btnType === "Radio-Button") {
                    for (let i = 0; i < array?.length; i++) {
                        let newObj = getOrigionalObj(origionalQue, array[i].uniqueId);
                        if (Object.keys(newObj)?.length) {
                            array[i] = JSON?.parse(JSON?.stringify(newObj));
                        } else {
                            array[i]['value'] = 'False';
                        }
                    }
                }
                if (newOptionValue) {
                    array[i].optionResponses[0].value = newValue
                } else {
                    array[i]['value'] = newValue;
                }
                if (array[i]?.btnType === 'Check-Box' && newValue === 'False') {
                    let newObj = getOrigionalObj(origionalQue, array[i].uniqueId);
                    newObj['disabled'] = false;
                    if (Object.keys(newObj)?.length) {
                        array[i] = JSON?.parse(JSON?.stringify(newObj));
                    }
                }
                if (array[i]?.btnType === 'Check-Box' && array[i].key === 'N/A' && newValue === 'True') {
                    for (let k = 0; k < array?.length; k++) {
                        if (array[k].key !== 'N/A') {
                            // array[k].value = 'False';
                            let newObj = getOrigionalObj(origionalQue, array[k].uniqueId);
                            if (Object.keys(newObj)?.length) {
                                array[k] = JSON?.parse(JSON?.stringify(newObj));;
                            }
                        }
                    }
                }
                if (array[i]?.btnType === 'Check-Box' && array[i].key === 'No Statement Impact' && newValue === 'True') {
                    for (let k = 0; k < array?.length; k++) {
                        if (array[k].key !== 'No Statement Impact') {
                            // array[k].value = 'False';
                            let newObj = getOrigionalObj(origionalQue, array[k].uniqueId);
                            if (Object.keys(newObj)?.length) {
                                array[k] = JSON?.parse(JSON?.stringify(newObj));;
                            }
                        }
                    }
                }
                if (array[i]?.btnType === 'Check-Box' && array[i].key === 'Same Security for all areas') {
                    for (let k = 0; k < array?.length; k++) {
                        if (array[k].key !== 'Same Security for all areas' && newValue === 'True') {
                            let newObj = getOrigionalObj(origionalQue, array[k].uniqueId);
                            newObj['disabled'] = true;
                            if (Object.keys(newObj)?.length) {
                                array[k] = JSON?.parse(JSON?.stringify(newObj));;
                            }
                        }
                        if (newValue === 'False') {
                            array[k]['disabled'] = false;
                        }
                    }
                }
                if (parent.key === "Is Offer Group Security specific security required" && targetKey.includes('No') && array[1]) {
                    for (let k = 0; k < array[1]?.optionResponses?.length; k++) {
                        array[1].optionResponses[k]['disabled'] = false;
                    }
                }

                if (array[i]?.btnType === 'Check-Box' && array[i].key === 'Same Security for all areas of the request') {
                    for (let k = 0; k < array?.length; k++) {
                        if (array[k].key !== 'Same Security for all areas of the request' && newValue === 'True') {
                            let newObj = getOrigionalObj(origionalQue, array[k].uniqueId);
                            newObj['disabled'] = true;
                            if (Object.keys(newObj)?.length) {
                                array[k] = JSON?.parse(JSON?.stringify(newObj));;
                            }
                        }
                        if (newValue === 'False') {
                            array[k]['disabled'] = false;
                        }
                    }
                }

                if (array[i]?.btnType === 'Check-Box' && array[i].key !== 'N/A' && newValue === 'True') {
                    for (let k = 0; k < array?.length; k++) {
                        if (array[k].key === 'N/A') {
                            // array[k].value = 'False';
                            let newObj = getOrigionalObj(origionalQue, array[k].uniqueId);
                            if (Object.keys(newObj)?.length) {
                                array[k] = JSON?.parse(JSON?.stringify(newObj));;
                            }
                        }
                    }
                }
                if (array[i]?.btnType === 'Check-Box' && array[i].key !== 'No Statement Impact' && newValue === 'True') {
                    for (let k = 0; k < array?.length; k++) {
                        if (array[k].key === 'No Statement Impact') {
                            // array[k].value = 'False';
                            let newObj = getOrigionalObj(origionalQue, array[k].uniqueId);
                            if (Object.keys(newObj)?.length) {
                                array[k] = JSON?.parse(JSON?.stringify(newObj));;
                            }
                        }
                    }
                }
                if (((parent && newValue === 'True') || (currentObject.key === "Text")) && parent?.btnType === 'Check-Box') {
                    parent['value'] = 'True';
                    parentChkIds.push(parent.uniqueId)
                }
                if (array[i]?.btnType === 'Check-Box' && array[i].optionResponses?.length && array[i].optionResponses[0]?.btnType === 'Multi-Drop-Down' && multiselectAction) {
                    for (let k = 0; k < array[i].optionResponses?.length; k++) {
                        array[i].optionResponses[k].value = newValue;
                    }
                }
                if (currentObject?.queIndex && currentObject?.queIndex === targetKey && multiselectAction && array[i].optionResponses?.length) {
                    for (let k = 0; k < array[i].optionResponses?.length; k++) {
                        if (array[i].optionResponses[k]?.btnType === 'Multi-Drop-Down') {
                            array[i].optionResponses[k].value = array[i].optionResponses[k].value === 'True' ? 'False' : 'True';
                        }
                    }
                }
                if (
                    parent.question === "What line of business is this impacting? (Select all that apply)"
                ) {
                    const lineOfBusinessList = [];
                    let productList = [];
                    parent.optionResponses.forEach(subQueObj => {
                        if (subQueObj.value === 'True' && subQueObj.key !== "Mobile") {
                            lineOfBusinessList.push({
                                ...subQueObj,
                                value: 'False'
                            });
                            subQueObj.optionResponses.forEach(proObj => {
                                if (proObj.value === 'True' && proObj.key !== "New") {
                                    productList.push({
                                        ...proObj,
                                        value: 'False'
                                    });
                                }

                                if (proObj.value === 'True' && proObj.key === "New") {
                                    productList.push({
                                        ...proObj?.optionResponses?.[0],
                                        value: 'False'
                                    });
                                }
                            })
                        }
                    });
                    let lineOfBusinessObj = { ...lineOfBusiness };
                    lineOfBusinessObj[parent.uiPage] = lineOfBusinessList;
                    let productObj = { ...products };
                    productObj[parent.uiPage] = productList;
                    setLineOfBusiness(lineOfBusinessObj);
                    setProducts(productObj);
                }
                if (
                    (lineOfBusiness[uiPage] && lineOfBusiness[uiPage].find(obj => obj.uniqueId === parent.uniqueId))
                ) {
                    let productList = [...products[uiPage]]
                    if (array[i].key === 'New') {
                        let index = productList.findIndex(pObj => pObj.uniqueId === array[i]['optionResponses'][0].uniqueId);
                        if (index >= 0 && array[i].value === 'True' && newValue !== '') {
                            productList[index]['key'] = newValue;
                        } else if ((index >= 0 && array[i].value === 'False') || (index >= 0 && array[i].value === 'True' && newValue === '')) {
                            productList.splice(index, 1)
                        } else if (array[i]?.optionResponses?.[0]?.value) {
                            productList.push({
                                ...array[i].optionResponses?.[0],
                                value: 'False',
                                key: newValue
                            });
                        }
                    } else if (newValue === 'True') {
                        productList.push({ ...array[i], "value": "False" });
                    } else if (newValue === 'False') {
                        productList = productList.filter(pObj => pObj.uniqueId !== array[i].uniqueId)
                    }
                    let productObj = { ...products };
                    productObj[uiPage] = productList;
                    setProducts(productObj);
                }
                return true;
            } else if (currentObject?.optionResponses || currentObject?.questionResponses) {
                if (replaceObjectById(currentObject?.optionResponses?.length ? currentObject?.optionResponses : currentObject?.questionResponses, targetKey, newValue, array[i], multiselectAction, newOptionValue)) {
                    return true;
                }
            }
        }
        return false;
    }

    const setTotalQuestionAnswerValue = (current, origionalQue) => {
        let totalQuestion = current?.length;
        let totalAnswered = 0;
        if (current?.[0]?.optionResponses?.[0]?.value !== origionalQue?.[0]?.optionResponses?.[0]?.value) {
            totalAnswered++;
        }
        if (totalQuestion > 1) {
            let secondQueAnswered = false;
            current[1]?.optionResponses.forEach((optObj, optIdx) => {
                if (optObj?.value !== origionalQue[1]?.optionResponses?.[optIdx]?.value) {
                    secondQueAnswered = true;
                }
                if (optObj?.value === 'True') {
                    totalQuestion += optObj?.questionResponses?.length ? optObj?.questionResponses?.length : 0;
                    optObj?.questionResponses?.forEach((ansObj, ansIdx) => {
                        if (ansObj.optionResponses?.[0]?.btnType === 'Radio-Button' || ansObj.optionResponses?.[0]?.btnType === 'Check-Box' || ansObj.optionResponses?.[0]?.btnType === 'Multi-Drop-Down') {
                            let checkedObj = ansObj.optionResponses?.find(objChk => objChk.value === 'True');
                            if (checkedObj) {
                                totalAnswered++;
                            }
                        }
                        if ((ansObj.optionResponses?.[0]?.btnType === 'Text' || ansObj.optionResponses?.[0]?.btnType === 'Text-Box') && ansObj.optionResponses?.[0].value !== '') {
                            totalAnswered++;
                        }
                    })
                }
            })
            if (secondQueAnswered) {
                totalAnswered++;
            }
        }
        setTotalQuestion(totalQuestion);
        setTotalAnsweredQuestion(totalAnswered);
        setTotalPercentage(Math.round((totalAnswered * 100) / totalQuestion));
        setQuestionnaire();
    }

    const toggleAllHandler = (value, uniqueId) => {
        setAnswer(uniqueId, value ? "True" : "False", true)
    }

    const setAnswer = (key, newValue, multiselectAction = false, newOptionValue = false) => {
        if (parentQueUniqueId?.[key] && ((newValue === 'True' && key === "N/A69") || (newValue === 'False' && key !== "N/A69"))) {
            setLastUncheckedKey(key);
            setDataLostPopup(true);
            setLastUncheckedTitle(`${key === "N/A69" ? 'Selecting' : 'Deselecting'} "${parentQueUniqueId?.[key]}"`);
        } else {
            updateAnswer(key, newValue, multiselectAction, newOptionValue)
        }
    }

    const updateAnswer = (key, newValue, multiselectAction, newOptionValue) => {
        let current = [...data];
        replaceObjectById(current, key, newValue, [], multiselectAction, newOptionValue);
        if (parentChkIds?.length) {
            parentChecked(current, parentChkIds);
        }
        setData(current);
        setTotalQuestionAnswerValue(current, origionalQue)
        let totalLinkQue = 1;
        if (data?.[1]) {
            totalLinkQue++;
            let numberIndex = 3;
            data[1]?.optionResponses?.forEach(obj => {
                if (obj.value === 'True' && obj?.questionResponses?.length) {
                    totalLinkQue += obj.questionResponses?.length;
                    obj.questionResponses.forEach(childObj => {
                        childObj['queIndex'] = numberIndex;
                        numberIndex++;
                    })
                }
            });
        }
        setTotalLinkedQuestion(totalLinkQue);
    }

    const saveDataLostPopup = () => {
        updateAnswer(lastUncheckedKey, lastUncheckedKey === "N/A69" ? 'True' : 'False', false);
        updateLinkedQuestionCount(lastUncheckedDetail?.index, lastUncheckedDetail?.value);
        setLastUncheckedKey('');
        setLastUncheckedTitle('');
        closeDataLostPopup();
    }

    const handleFile = (e, uniqueId) => {
        let fileObj = e.target.files[0];
        setAnswer(uniqueId, fileObj)
    };

    const editLinkedQuestion = (index) => {
        const newArr = [...dialogQuestionItem]
        newArr[index]['editMode'] = true;
        setDialogQuestionItem(newArr);
    }

    const deleteLinkedQuestion = (index) => {
        const newArr = [...dialogQuestionItem]
        newArr.splice(index, 1)
        setDialogQuestionItem(newArr);
    }

    const updateLinkedQuestion = (index, value) => {
        const newArr = [...dialogQuestionItem]
        newArr[index]['linkedQuestion'] = value;
        setDialogQuestionItem(newArr);
    }

    const updateLinkedAnswer = (index, value) => {
        const newArr = [...dialogQuestionItem]
        newArr[index]['linkedAnswer'] = value;
        setDialogQuestionItem(newArr);
    }

    const setUpdateLinkedQuestionAnswer = (queId, current, updatedQueList) => {
        for (let i = 0; i < current?.length; i++) {
            if (queId === current[i]['queIndex']) {
                current[i]['userQuestions'] = updatedQueList;
            } else if (current[i]?.optionResponses) {
                for (let j = 0; j < current[i]?.optionResponses?.length; j++) {
                    if (current[i]?.optionResponses?.[j]?.questionResponses) {
                        for (let k = 0; k < current[i]?.optionResponses?.[j]?.questionResponses?.length; k++) {
                            if (queId === current[i]?.optionResponses?.[j]?.questionResponses?.[k]?.['queIndex']) {
                                current[i].optionResponses[j].questionResponses[k]['userQuestions'] = updatedQueList;
                                break;
                            }
                        }
                    }
                }
            }
        }
        return current;
    }

    const updateLinkedQuestionAnswer = () => {
        const queId = dialogItem.queIndex;
        let current = [...data];
        let validData = true;
        const updatedQuestionList = dialogQuestionItem.map(obj => {
            if (!obj?.linkedAnswer?.trim() || !obj?.linkedQuestion?.trim()) {
                validData = false;
            }
            const newObj = { ...obj };
            newObj['editMode'] = false;
            return newObj;
        });
        if (validData) {
            setShowAlert(false);
            const updatedArr = setUpdateLinkedQuestionAnswer(queId, current, updatedQuestionList);
            setData(updatedArr);
            handleLinkedQuestionPreview(false);
        } else {
            setShowAlert(true);
        }
    }


    const renderLinkedQuestion = () => {
        const cnt = 1;
        return (
            <>
                {
                    showAlert && <KiteAlert
                        type="error"
                        level="page">Please make sure all fields have valid values!</KiteAlert>
                }
                {
                    dialogQuestionItem.map((val, index) => (
                        <div key={'linked-que' + index} >
                            {
                                val.editMode ? (
                                    <div className='mb-3'>
                                        <h6>{cnt + index}.</h6>
                                        <textarea key={'link-que' + index} onChange={(e) => updateLinkedQuestion(index, e.target.value)} className="form-control" rows="1" style={{ marginBottom: '10px' }} id="comment" defaultValue={val.linkedQuestion}></textarea>
                                        <textarea key={'link-ans' + index} onChange={(e) => updateLinkedAnswer(index, e.target.value)} className="form-control" rows="5" id="comment" defaultValue={val.linkedAnswer}></textarea>
                                    </div>
                                )
                                    : (
                                        <div style={{ display: 'flex', marginTop: '5px', marginBottom: '5px' }}>
                                            <div style={{ width: '80%', marginTop: '10px' }}>
                                                <h6>{cnt + index}. {val.linkedQuestion}</h6>
                                                <div style={{ marginLeft: '15px' }}> {val.linkedAnswer}</div>
                                            </div>
                                            <div style={{ float: 'right', marginTop: '20px' }} onClick={() => editLinkedQuestion(index)}>
                                                <KiteIcon
                                                    ariaLabel=""
                                                    badge=""
                                                    className=""
                                                    fill="#0073D1"
                                                    icon="ki-edit-f"
                                                    title="Edit"
                                                    offset="10"
                                                    inline="true"
                                                    size="1.5rem"
                                                />
                                            </div>
                                            <div style={{
                                                float: 'right', marginTop: '20px', marginLeft: '20px'
                                            }} onClick={() => deleteLinkedQuestion(index)}>
                                                <KiteIcon
                                                    ariaLabel=""
                                                    badge=""
                                                    className=""
                                                    fill="#0073D1"
                                                    icon="ki-trash-f"
                                                    title="Remove"
                                                    offset="10"
                                                    inline="true"
                                                    size="1.5rem"
                                                />
                                            </div>
                                        </div>
                                    )
                            }


                        </div >
                    ))
                }
                <div style={{ marginTop: '2rem', display: 'flex' }}>
                    <KiteButton legacy style={{ marginRight: '2rem' }} onClick={() => updateLinkedQuestionAnswer()}>Confirm Changes</KiteButton >
                    <KiteButton legacy variant="secondary" onClick={() => handleLinkedQuestionPreview(false)
                    }>Cancel</KiteButton >
                </div>
            </>
        )
    }

    const updateLinkedQuestionCount = (index, val) => {
        let totalQue = totalLinkedQuestion;
        let queCountTotal = data?.[1]?.optionResponses?.[index]?.questionResponses?.length;
        if (queCountTotal) {
            if (val) {
                totalQue += queCountTotal;
            } else {
                totalQue -= queCountTotal;
            }
            setTotalLinkedQuestion(totalQue);
        }
    }

    const addLinkedQuestion = (queObj) => {
        const queData = [...data];
        if (queObj?.queIds?.indexOf(1) > -1) {
            if (!queData[0]?.['userQuestions']) { queData[0]['userQuestions'] = []; }
            queData[0]['userQuestions'].push({
                linkedQuestion: queObj?.question,
                linkedAnswer: queObj?.response
            })
        }
        if (queObj?.queIds.indexOf(2) > -1) {
            if (!queData[1]?.['userQuestions']) { queData[1]['userQuestions'] = []; }
            queData[1]['userQuestions'].push({
                linkedQuestion: queObj?.question,
                linkedAnswer: queObj?.response
            })
        }
        queData?.[1].optionResponses.forEach((childQue, childIdx) => {
            if (childQue.value === 'True') {
                childQue.questionResponses.forEach((subChildQue, subChildIdx) => {
                    if (queObj?.queIds.indexOf(subChildQue.queIndex) > -1) {
                        if (!subChildQue['userQuestions']) { subChildQue['userQuestions'] = []; }
                        subChildQue['userQuestions'].push({
                            linkedQuestion: queObj?.question,
                            linkedAnswer: queObj?.response
                        });
                    }
                });
            }
        })
        setData(queData)
    }

    const handleAddFile = (newFileObject, questionId) => {
        const newData = JSON?.parse(JSON?.stringify(data));
        const updatedData = insertFileObject(newData, newFileObject, questionId);
        setData(updatedData);
    };

    const handleUpdateFile = (newFileObject, questionId) => {
        const newData = JSON?.parse(JSON?.stringify(data));
        const updatedData = updateFileObject(newData, newFileObject, questionId);
        setData(updatedData);

    };

    const updateFileObject = (data, newFileObject, questionId) => {
        const fileInfoResponses = findFileInfoResponses(data, questionId);
        if (fileInfoResponses) {
            fileInfoResponses.map(file => {
                if (file.uri === newFileObject.uri) {
                    file.disabled = true;
                }
            });
        }
        setData(data);
        return data;
    };

    const insertFileObject = (data, newFileObject, questionId) => {
        const fileInfoResponses = findFileInfoResponses(data, questionId);
        if (fileInfoResponses) {
            fileInfoResponses.push(newFileObject);
        }
        setData(data);
        return data;
    };

    const findFileInfoResponses = (questionnaire, questionId, path = []) => {
        for (const question of questionnaire) {
            const newPath = [...path, question.questionId];
            if (question.questionId === questionId && question.fileInfoResponses) {
                return question.fileInfoResponses;
            }
            if (question.optionResponses) {
                for (const option of question.optionResponses) {
                    const optionPath = [...newPath, 'optionResponses', option.questionId];
                    if (option.questionResponses) {
                        const fileInfoResponses = findFileInfoResponses(option.questionResponses, questionId, [...optionPath, 'questionResponses']);
                        if (fileInfoResponses) {
                            return fileInfoResponses;
                        }
                    }
                    if (option.optionResponses) {
                        const fileInfoResponses = findFileInfoResponses([option], questionId, [...optionPath, 'optionResponses']);
                        if (fileInfoResponses) {
                            return fileInfoResponses;
                        }
                    }
                }
            }
        }
        return null;
    };

    const renderItems = (index, item, rootNode = false, displayQue = true, accordianName) => {
        if (item.btnType === "Radio-Button" && item.value === "True" && item.optionResponses.length) {
            let isSecurityChecked = item.optionResponses.find(qObj => qObj.key === "Same Security for all areas" && qObj.value === 'True');
            if (isSecurityChecked) {
                item.optionResponses.forEach(grpObj => {
                    if (grpObj.key !== "Same Security for all areas") {
                        grpObj.disabled = true;
                    }
                })
            }
        }
        const childObj = {
            ...item.optionResponses,
        };
        if (item.optionResponses?.[0]?.btnType === 'Multi-Drop-Down') {
            childObj['optionResponses'] = item.optionResponses.filter(obj => obj?.btnType !== "Multi-Drop-Down");
        }
        if (displayQue) {
            no++;
        }

        const getDivStyle = (item) => {
            if (item.uiPage === 'Landing_Page' && item.optionResponses.length && item.queIndex !== 1) {
                for (let i = 0; i < item.optionResponses.length; i++) {
                    if (item.optionResponses[i].btnType === 'Check-Box') {
                        return { display: 'flex' };
                    }
                }
            }
            else if (item.btnType === "Radio-Button" && item.key === "No" && item.value === "True" && item.optionResponses.length) {
                for (let i = 0; i < item.optionResponses.length; i++) {
                    if (item.optionResponses[i].btnType === 'Check-Box') {
                        return { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' };
                    }
                }
            }
            return {};
        };

        return (
            <ul key={'que' + no} className={displayQue ? '' : 'pl-0'}>
                {
                    item.optionResponses?.length ? (
                        <li key={'child-que' + (no)} className='list-item' >
                            <div>
                                {
                                    // Displaying the question title
                                    item.question && displayQue ? (
                                        <div style={{ display: 'flex', position: 'relative', zIndex: '998', bottom: '8px', top: '-8', paddingTop: '3px' }}>
                                            <div className='mb-3'>
                                                <div className='moqus'> {item.required ? (<span style={{ color: 'red' }}>* </span>) : ("")} {item?.queIndex}. {item.question}</div>
                                            </div>
                                            {
                                                item?.userQuestions?.length ? (
                                                    <div onClick={() => openLinkedQuestionDialog(item)}>
                                                        <KiteBadge className='linked-que' content={item?.userQuestions?.length} xPos="right" yPos="top" color="green">
                                                        </KiteBadge>
                                                    </div>
                                                ) : ("")
                                            }

                                        </div>
                                    )
                                        : ("")
                                }
                                {
                                    item?.optionResponses?.[0]?.btnType === 'Radio-Button' ?
                                        (
                                            <div className='mo' style={{ paddingLeft: '0rem' }}>
                                                <RadioButton optionResponsesDetail={item} indexVal={index} renderItems={(ind, itemObj, rootNode, displayQue) => renderItems(ind, itemObj, rootNode, displayQue, accordianName)} setAnswer={(key, value) => setAnswer(key, value)} />
                                            </div>
                                        ) : (
                                            item.optionResponses?.[0]?.btnType === 'Multi-Drop-Down' ? (
                                                <>
                                                    <MultiSelectOption
                                                        label=""
                                                        options={item?.optionResponses ? item?.optionResponses.filter(obj => obj?.btnType === "Multi-Drop-Down") : []}
                                                        toggleAllHandler={(value) => toggleAllHandler(value, item?.uniqueId ? item?.uniqueId : item?.queIndex)}
                                                        changeSelection={(uniqueId, value) => setAnswer(uniqueId, value)} />
                                                    <React.Fragment key={'sub-multi-child-que' + index}>
                                                        {
                                                            childObj?.optionResponses?.length ? (
                                                                renderItems(index, childObj, false, false, accordianName)
                                                            ) : ("")
                                                        }
                                                    </React.Fragment>
                                                </>

                                            ) : (
                                                <React.Fragment>
                                                    <div style={getDivStyle(item)} className='mo'>
                                                        {
                                                            item.optionResponses.map((optionResponsesDetail, optionResponsesIndex) => (
                                                                <div key={'child-que' + index + '_' + optionResponsesIndex} >
                                                                    {
                                                                        optionResponsesDetail?.btnType === 'Text-Box' && (
                                                                            <TextArea indexVal={index + '_' + optionResponsesIndex} questionDetail={item} setAnswer={(key, value) => setAnswer(key, value)} />
                                                                        )
                                                                    }
                                                                    {
                                                                        optionResponsesDetail?.btnType === 'File-Drop' &&
                                                                        (
                                                                            <div className='-1'>
                                                                                <FileDrop
                                                                                    selectedFile={optionResponsesDetail.value}
                                                                                    optionResponsesDetail={optionResponsesDetail}
                                                                                    bds={props.data?.bdsNumber}
                                                                                    onAddFile={handleAddFile}
                                                                                    onUpdateFile={handleUpdateFile}
                                                                                />
                                                                            </div>
                                                                        )
                                                                    }

                                                                    {
                                                                        ((optionResponsesDetail?.btnType === 'Check-Box' && !rootNode) || (optionResponsesDetail?.btnType === 'Check-Box' && rootNode && item.queIndex === 1)) ? (
                                                                            <div>
                                                                                <CheckBox optionResponsesDetail={optionResponsesDetail}
                                                                                    indexVal={index + '_' + optionResponsesIndex}
                                                                                    renderItems={(ind, itemObj) => renderItems(ind, itemObj, rootNode, displayQue, accordianName)}
                                                                                    setAnswer={(key, value, multiselectAction, newOptionValue) => setAnswer(key, value, multiselectAction, newOptionValue)}
                                                                                    rootNode={rootNode}
                                                                                    updateCustomComponentValue={(uniqueId, customComponent) => updateCustomComponentValue(uniqueId, customComponent)}
                                                                                    accordianName={accordianName}
                                                                                    parentKey={item?.key}
                                                                                    products={products}
                                                                                    lineOfBusiness={lineOfBusiness}
                                                                                />
                                                                            </div>
                                                                        ) : optionResponsesDetail?.btnType === 'Check-Box' && rootNode ? (
                                                                            <div className="mo" style={{ paddingRight: '50px' }}>
                                                                                <KiteCheckbox
                                                                                    className='element'
                                                                                    id={'main_chk_' + index + '_' + optionResponsesIndex}
                                                                                    label={optionResponsesDetail.key}
                                                                                    name={'main_chk_' + index + '_' + optionResponsesIndex}
                                                                                    disabled={optionResponsesDetail?.disabled ? true : false}
                                                                                    onChange={(e) => {
                                                                                        if (e.target.checked) {
                                                                                            updateLinkedQuestionCount(optionResponsesIndex, e.target.checked);
                                                                                        } else {
                                                                                            setLastUncheckedDetail({
                                                                                                index: optionResponsesIndex,
                                                                                                value: e.target.checked
                                                                                            });
                                                                                        }
                                                                                        setAnswer(optionResponsesDetail.uniqueId, e.target.checked ? 'True' : 'False');
                                                                                    }}
                                                                                    checked={optionResponsesDetail.value === 'True' ? true : false} />
                                                                            </div>
                                                                        ) : ("")
                                                                    }
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </React.Fragment>
                                            )
                                        )
                                }

                            </div>
                        </li>
                    ) : ('')
                }
            </ul >
        )
    }

    const closeDataLostPopup = () => {
        setDataLostPopup(false);
    }

    const handleTabChange = (uniqueId, value, accIndex) => {
        let ind = ++accIndex;
        // scroll to top
        if (document.getElementsByClassName('kite-accordion-row__content-window') && document.getElementsByClassName('kite-accordion-row__content-window')[ind] && document.getElementsByClassName('kite-accordion-row__content-window')[ind]?.['scrollTop']) {
            document.getElementsByClassName('kite-accordion-row__content-window')[ind]['scrollTop'] = 0
        }
        let current = [...data];
        for (let j = 0; j < current[1]?.optionResponses?.length; j++) {
            if (current[1]?.optionResponses[j].uniqueId === uniqueId) {
                current[1].optionResponses[j].currentTabs = value;
                current[1].optionResponses[j].tabLable = current[1]?.optionResponses[j]?.tabs?.[value];
            }
        }
        setData(current);
    }

    const handleAccordionClick = (rowId) => {
        if (expandedAccordionRows.includes(rowId)) {
            setExpandedAccordionRows(expandedAccordionRows.filter(id => id !== rowId));
        } else {
            setExpandedAccordionRows([...expandedAccordionRows, rowId]);
        }
    };

    useEffect(() => {
        setLoading(true)
        fetchData();
    }, [props.data?.bdsNumber]);

    useEffect(() => {
        fetchTableData();
    }, []);
    const accordions = props.data.bdsNumber ? [{ id: 'r1', title: `${props.data.bdsNumber}` }] : [];
    const [current, setCurrent] = React.useState(0);
    const handleTab = (value) => setCurrent(value);

    return (
        <React.Fragment>
            {loading && <KiteProgressIndicator
                id="kp1"
                title={saveMsg}
                message='' />}
            <KiteDialog
                id="1"
                open={isOpen}
                title={!saveForLaterClick ? "Do you want to Submit your changes?" : "Do you want to Save your changes?"}
                icon="ki-caution-circle-f"
                onClose={() => handleDialogChange(false)}
                primaryBtnLabel="Yes"
                onPrimaryBtnClick={() => saveForLater()}
                secondaryBtnLabel="No"
                onSecondaryBtnClick={() => handleDialogChange(false)}
            />

            <KiteDialog
                id="1"
                open={dataLostPopup}
                title={`${lastUncheckedTitle} will cause you to lose all unsaved changes. Do you wish to proceed?`}
                icon="ki-caution-circle-f"
                onClose={() => closeDataLostPopup(false)}
                primaryBtnLabel="Yes"
                onPrimaryBtnClick={() => saveDataLostPopup()}
                secondaryBtnLabel="No"
                onSecondaryBtnClick={() => closeDataLostPopup(false)}
            />

            <KiteDialog
                id="1"
                open={Open}
                title="Linked Question(s) and Response(s)"
                icon=""
                onClose={() => handleLinkedQuestionPreview(false)}
                primaryBtnLabel='close'
                className='edit-linked-que'
            >
                {renderLinkedQuestion()}
            </KiteDialog>

            <KiteDialog
                id="11"
                open={invalidQuePopup}
                title="Please answer the following questions before submitting"
                icon="ki-caution-circle-f"
                onClose={() => setInvalidQuePopup(false)}
                primaryBtnLabel='close'
                onPrimaryBtnClick={() => setInvalidQuePopup(false)}
                className='edit-linked-que'
                secondaryBtnLabel="Close"
                onSecondaryBtnClick={() => handleDialogChange(false)}
            >
                {renderInvalidQue()}
            </KiteDialog>
            {!loading ?
                <React.Fragment>
                    <div className='marketingOfferIntakeForm' style={{ marginTop: '0.5rem', marginBottom: '5rem' }}>
                        <React.Fragment>
                            {
                                <div>
                                    <KiteGrid className="mo rk__w100%">
                                        <KiteGridCell col={12}>
                                            {accordions.length ?
                                                (<KiteAccordion
                                                    defaultActiveRow="1">
                                                    {accordions.map(({ id, title }) =>
                                                        <KiteAccordionRow
                                                            title={<div>{title}</div>}
                                                            // label="Initiated by: "
                                                            id={id}
                                                            key={id}>
                                                            <span>
                                                                <KiteTabs selectedIndex={current} focusChange={handleTab}>
                                                                    <KiteTab label="Info">
                                                                        <div className="rk__w100%">
                                                                            <div className="mo acc">
                                                                                <div className="scroll-container">
                                                                                    <MarketingBdsOverview
                                                                                        data={props.data} />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </KiteTab>
                                                                    <KiteTab label="BDS Attachment(s)">
                                                                        <div className="rk__w100%">
                                                                            <div className="mo acc">
                                                                                <MarketingBdsAttachments data={props.data} />
                                                                            </div>
                                                                        </div>
                                                                    </KiteTab>
                                                                </KiteTabs>
                                                            </span>
                                                            <span>
                                                                {data.map((questionData, index) => (
                                                                    <div key={'main-question-section' + index}>{renderItems(index, questionData, true, true, title)}</div>
                                                                ))}
                                                            </span>
                                                        </KiteAccordionRow>
                                                    )}
                                                </KiteAccordion>)
                                                : (
                                                    <div className=''>
                                                        <KiteCard
                                                            elevation='3'>
                                                            <KiteIcon
                                                                ariaLabel=""
                                                                badge=""
                                                                className=""
                                                                fill="#0073D1"
                                                                icon="ki-search"
                                                                title="One two three o'clock"
                                                                offset="10"
                                                                inline="true"
                                                                size="2rem"
                                                            />
                                                            <h4 style={{ marginLeft: '3rem' }}><div style={{ marginTop: '-3rem', paddingLeft: '6rem' }}></div>No Form Found.</h4>
                                                        </KiteCard>
                                                    </div>
                                                )
                                            }
                                        </KiteGridCell>
                                    </KiteGrid>
                                </div>
                            }
                            {
                                data?.[1]?.optionResponses.map((accordianObj, index) => (
                                    <React.Fragment key={'accordian' + index}>
                                        {
                                            accordianObj.value === 'True' && accordianObj.key !== 'N/A' ? (
                                                <div className="mo rk__w100%" >
                                                    <KiteAccordion
                                                        key={'accordian-data' + index}
                                                        className='child-question'>
                                                        <KiteAccordionRow
                                                            title={accordianObj.key}
                                                            id={`child-question-${accordianObj.key}`}>
                                                            <KiteTabs
                                                                selectedIndex={accordianObj.currentTabs}
                                                                focusChange={(val) => handleTabChange(accordianObj.uniqueId, val, index)}
                                                                alignment='center'
                                                                className='grouping-tab'
                                                            >
                                                                {
                                                                    accordianObj?.tabs.map((tabLabel, tabIndex) => (
                                                                        <KiteTab key={'tab-que' + tabIndex} label={
                                                                            (accordianObj.requiredTabObj[tabLabel] ? (
                                                                                <><span style={{ color: 'red', paddingRight: '3px' }}>*</span>{tabLabel}</>
                                                                            ) : (tabLabel))
                                                                        }>
                                                                            {
                                                                                <>
                                                                                    <div>
                                                                                        {
                                                                                            accordianObj?.questionResponses?.map((questionData, queindex) => (
                                                                                                questionData.questionGroup === accordianObj.tabLable ? (<React.Fragment key={'accordian-que-' + '1_' + index + queindex}>{renderItems('1_' + index + queindex, questionData, false, true, accordianObj.key)}</React.Fragment>) : (
                                                                                                    ""
                                                                                                )
                                                                                            ))
                                                                                        }
                                                                                    </div>
                                                                                    <div>

                                                                                        {
                                                                                            accordianObj.tabLable === 'Selected Requirements' ? (
                                                                                                <div className='rule-table'>
                                                                                                    <KiteDataTable className='dataTable' zebraStripe='striped' spacing='compact' textAlignment='center' responsiveness='fluid' borders="cell">
                                                                                                        <KiteTableHeader className='tableHeaderColumns'>
                                                                                                            <KiteColumn><div className='tableHeader'>Requirements</div></KiteColumn>
                                                                                                            {/* <KiteColumn><div className='smallHeader'>Offer Type</div></KiteColumn> */}
                                                                                                        </KiteTableHeader>
                                                                                                        <tbody>
                                                                                                            {
                                                                                                                (accordianObj.key === 'Residential' ? ruleData['residential'] : (accordianObj.key === 'SMB' ? ruleData['smb'] : [])).map((ruleRow, ruleIndex) =>
                                                                                                                    <KiteRow key={'rule-table-row-' + ruleIndex}>
                                                                                                                        <KiteCell>
                                                                                                                            {ruleRow.requirement.length > 200 ? (
                                                                                                                                <KiteAccordion
                                                                                                                                    className='descriptionAccordion'
                                                                                                                                    onChange={() => handleAccordionClick('rule_' + accordianObj.key + ruleIndex)}>
                                                                                                                                    <KiteAccordionRow
                                                                                                                                        title={`${ruleRow.requirement.substring(0, 190)}...`}
                                                                                                                                        id={`projectDescription-${ruleIndex}`}
                                                                                                                                    >
                                                                                                                                        <div className='accordionDesc' style={{ fontSize: '12px' }}>{ruleRow.requirement}</div>
                                                                                                                                    </KiteAccordionRow>
                                                                                                                                </KiteAccordion>) : (
                                                                                                                                <div className='nonAccordionDesc'>{ruleRow.requirement}</div>
                                                                                                                            )}</KiteCell>
                                                                                                                        {/* <KiteCell style={{ paddingLeft: '2rem' }}>{ruleRow.requirement}</KiteCell> */}
                                                                                                                        {/* <KiteCell style={{ paddingLeft: '2rem' }}>{ruleRow.offerType === null ? 'No Data' : ruleRow.offerType}</KiteCell> */}
                                                                                                                    </KiteRow>
                                                                                                                )
                                                                                                            }
                                                                                                            {
                                                                                                                ((accordianObj.key === 'Residential' && !ruleData['residential'].length) || (accordianObj.key === 'SMB' && !ruleData['smb'].length)) ? (
                                                                                                                    <KiteRow key={'rule-table-row-no-data'}>
                                                                                                                        <KiteCell colSpan={2} style={{ paddingLeft: '2rem', textAlign: 'center' }}>No Data Found.</KiteCell>
                                                                                                                    </KiteRow>
                                                                                                                ) : ('')
                                                                                                            }
                                                                                                        </tbody>
                                                                                                    </KiteDataTable>
                                                                                                </div>
                                                                                            ) : (
                                                                                                ""
                                                                                            )
                                                                                        }
                                                                                    </div>
                                                                                </>

                                                                            }
                                                                        </KiteTab>
                                                                    ))
                                                                }
                                                            </KiteTabs>

                                                        </KiteAccordionRow>
                                                    </KiteAccordion>
                                                </div>
                                            ) : ("")
                                        }
                                    </React.Fragment>
                                ))
                            }

                        </React.Fragment>
                    </div >
                    <div className='footer-section'>
                        <div className="progressIndicator">
                            <KiteProgressIndicator
                                id="linear-progress"
                                variant="linear"
                                message=""
                                title=""
                                percent={totalPercentage}
                            />
                        </div>
                        <div style={{ marginLeft: '5%', marginTop: '20px' }}>
                            <MarketingOfferIntakeLinkedQuestion
                                label=""
                                queCount={totalLinkedQuestion}
                                addLinkedQuestion={(queObj) => addLinkedQuestion(queObj)}
                                disabled={statusFlagData === 'COMPLETED' || !writeAccess ? true : false ? true : false} />
                            <div style={{ display: 'flex', marginTop: '-3rem' }}>

                                <KiteButton disabled={statusFlagData === 'COMPLETED' || !writeAccess ? true : false} onClick={() => { setSaveForLaterClick(true); handleDialogChange(true); }} size={'lg'} style={{ background: '#002E88', marginLeft: '4rem' }}>Save for Later</KiteButton>

                                <KiteButton disabled={statusFlagData === 'COMPLETED' || !writeAccess ? true : false} onClick={() => { setSaveForLaterClick(false); validateQuestion(true); }} size={'lg'} style={{ background: '#002E88', marginLeft: '1rem' }}>Submit</KiteButton>
                            </div >
                        </div >
                    </div>
                </React.Fragment > : ("")
            }
        </React.Fragment >
    )
}

export default MarketingOfferIntakeForm
