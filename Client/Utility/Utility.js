//Alert field
 function outputMessage(msg, bgcolor, timer) 
{
  const div = document.querySelector('div.alert-msg');

  div.textContent = msg
  //style div
  div.style.color = '#fff'
  div.style.backgroundColor = bgcolor;
  div.style.textAlign = 'center'
  div.style.padding = '.5rem 0'
  div.style.display = 'grid'
 
  //set value to nothing after timer
  setTimeout(()=>{
    
    div.style.display = 'none'
   
  }, timer) 
  //end of outputmessage
}