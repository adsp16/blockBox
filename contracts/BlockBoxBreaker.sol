// pragma solidity ^0.5.16;

// contract BlockBox {
    
//     // Global Varaibles
//     string public name = "BlockBox";
//     uint256 public fileCount = 0;
//     mapping(uint256 => File) public files;
//     address admin;
//     bool isActive = true;

//     // Struct
//     struct File {
//         uint256 fileId;
//         address payable uploader;
//         string fileHash;
//         string fileType;
//         uint256 fileSize;
//         string fileName;
//         uint256 uploadTime;
//     }

//     // Events
//     event FileUploaded(
//         uint256 fileId,
//         address payable uploader,
//         string fileHash,
//         string fileType,
//         uint256 fileSize,
//         string fileName,
//         uint256 uploadTime
//     );



//     //Constructor
//     constructor() public {
//         admin = msg.sender;
//     }
    
    
//     //Modifiers
//     modifier activeContract() {
//         require(isActive == true);
//         _;
//     }
    

//     // Functions

//     function toggleCircuitBreaker() external {
//         require(admin == msg.sender);
//         isActive = !isActive;
//     }
    
//     function getOwner() view external activeContract() returns(address) {
//         return admin;
//     }
    
    
    
//     function uploadFile(
//         string memory _fileHash,
//         string memory _fileType,
//         uint256 _fileSize,
//         string memory _fileName
//     ) public activeContract() {
//         // Require a file fileName
//         require(bytes(_fileName).length > 0);
//         // Require a file type
//         require(bytes(_fileType).length > 0);
//         // Require a file hash true
//         require(bytes(_fileHash).length > 0);

//         // Require a uploader address
//         require(msg.sender != address(0));
//         //Require a file size
//         require(_fileSize > 0);
//         fileCount++;
//         files[fileCount] = File(
//             fileCount,
//             msg.sender,
//             _fileHash,
//             _fileType,
//             _fileSize,
//             _fileName,
//             now
//         );
//         //Event Trigger
//         emit FileUploaded(
//             fileCount,
//             msg.sender,
//             _fileHash,
//             _fileType,
//             _fileSize,
//             _fileName,
//             now
//         );
//     }
// }