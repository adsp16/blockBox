pragma solidity ^0.5.16;

contract BlockBox {

    // Global Varaibles
    string public name = "BlockBox";
    uint public fileCount = 0;
    mapping(uint => File) public files;

    // Struct
      struct File {
      uint fileId;
      address payable uploader;
      string fileHash;
      string fileType;
      uint fileSize;
      string fileName;
      uint uploadTime;
    }

    // Events
    event FileUploaded(
    uint fileId,
    address payable uploader,
    string fileHash,
    string fileType,
    uint fileSize,
    string fileName,
    uint uploadTime
    );

    // Modifiers

    //Constructor
     constructor() public {}

    // Functions
    function uploadFile(string memory _fileHash, string memory _fileType, uint _fileSize, string memory _fileName) public {
           // Require a file fileName
        require(bytes(_fileName).length > 0);
         // Require a file type
        require(bytes(_fileType).length > 0);
        // Require a file hash true
        require(bytes(_fileHash).length > 0);

        // Require a uploader address
        require(msg.sender!=address(0));
        require(_fileSize > 0);
          fileCount ++;
         files[fileCount] = File(fileCount, msg.sender, _fileHash, _fileType , _fileSize, _fileName, now);
    //Event Trigger
      emit FileUploaded(fileCount, msg.sender, _fileHash, _fileType , _fileSize, _fileName, now);

    }
}