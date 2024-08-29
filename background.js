chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "downloadAttendance") {
      chrome.storage.local.get('attendees', function(data) {
        const attendees = data.attendees || {};
        const blob = new Blob([JSON.stringify(attendees, null, 2)], {type: "application/json"});
        const url = URL.createObjectURL(blob);
        const filename = `meet_attendance_${new Date().toISOString()}.json`;
        
        chrome.downloads.download({
          url: url,
          filename: filename,
          saveAs: true
        });
      });
    }
  });