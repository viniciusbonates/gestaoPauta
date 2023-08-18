function beforeTaskSave(colleagueId,nextSequenceId,userList){
    if(nextSequenceId == 8){
        hAPI.setCardValue('hd_numState', nextSequenceId);    
    }else if(nextSequenceId == 14){
        hAPI.setCardValue('hd_numState', nextSequenceId);
    }
}