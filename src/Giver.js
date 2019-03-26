import React from 'react';

function Giver(props) {
  return (
    <form>
      <div class="form-group">
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-4 col-form-label text-right">Enter your alias: </label>
          <div class="col-sm-6">
            <input id="alias" class="form-control" type="text" placeholder="Your Microsoft alias" />
            <small id="emailHelp" class="form-text text-muted text-left">Leave blank to remain anonymous</small>
          </div>
        </div>
      </div>
    </form>
  );  
}

export default Giver;