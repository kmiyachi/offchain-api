pragma solidity >=0.4.21 <0.6.0;

import "./SafeMath.sol";

contract Member {

    bytes32 lunaID;
    bool proxyUser;

    string[] dataElements;
    mapping(string=>address) dataMap;

    struct Modification {
        string timeStamp;
        string modType;
    }

    Modification[] modifications;


    constructor(bytes32 _id, bool _proxy) public {
        lunaID = _id;
        proxyUser = _proxy;
    }

    function addData(address _dataFile, string memory _dataElement, string memory _timeStamp) public {
        dataElements.push(_dataElement);
        dataMap[_dataElement] = _dataFile;
        modifications.push(Modification(_timeStamp, "add"));
    }

    function editData(string memory _dataElement, address _newDataAddress, string memory _timeStamp) public {
        dataMap[_dataElement] = _newDataAddress;
        modifications.push(Modification(_timeStamp, "edit"));
    }

    function deleteData(string memory _dataElement, string memory _timeStamp) public {
        delete dataMap[_dataElement];
        modifications.push(Modification(_timeStamp, "delete"));
    }
}