document.addEventListener('DOMContentLoaded', function() {
    function updateAttendeeList() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "getAttendees"}, function(response) {
          if (response && response.attendees) {
            const attendeeList = document.getElementById('attendeeList');
            attendeeList.innerHTML = '';
            response.attendees.forEach(name => {
              const li = document.createElement('li');
              li.textContent = name;
              attendeeList.appendChild(li);
            });
          }
        });
      });
    }
  
    updateAttendeeList();
    setInterval(updateAttendeeList, 5000); // Update every 5 seconds
  
    document.getElementById('downloadBtn').addEventListener('click', function() {
      chrome.runtime.sendMessage({action: "downloadAttendance"});
    });
  });