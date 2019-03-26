import React from 'react';

function Receiver(props) {
  return (
    <form>
      <div class="form-group">
        <div class="form-group row">
          <label class="col-sm-4 col-form-label text-right">Enter your victim's auth token:</label>
          <div class="col-sm-6">
            <input id="receiver-auth" class="form-control" type="text" placeholder="Bearer 107-xxxxxxxxxxxxx" />
            <small id="emailHelp" class="form-text text-muted text-left">Go to Yammer to take their auth token</small>
          </div>
        </div>
      </div>
    </form>
  );  
}

export default Receiver;