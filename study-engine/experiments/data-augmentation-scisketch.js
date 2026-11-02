/** Unlisted Data Augmentation SciSketch A/B comparison.
 * Comparison never creates quiz inputs or modifies assessment state.
 */
export function mountDataAugmentationSciSketch(root){
  const cards=[...root.querySelectorAll('.ds-card')];
  if(cards.length!==7)throw Error('Expected 7 SciSketch Data Augmentation cards; got '+cards.length);
  for(const [index,card] of cards.entries()){
    const control=card.querySelector('.ds-select');
    if(!control)throw Error('Missing comparison control on Q'+(index+1));
    const update=()=>{
      const value=control.value;
      if(!['new','original','both'].includes(value))return;
      card.dataset.mode=value;
      const newPane=card.querySelector('[data-variant="new"]');
      const originalPane=card.querySelector('[data-variant="original"]');
      newPane.hidden=value==='original';
      originalPane.hidden=value==='new';
    };
    control.addEventListener('change',update);
    update();
  }
}
