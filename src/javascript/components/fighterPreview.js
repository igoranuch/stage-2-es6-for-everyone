import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`
  });
  // todo: show fighter info (image, name, health, etc.)
  if (fighter) {
    let fighterImage = createFighterImage(fighter);
    let fighterInfo = createElement({ tagName: 'div', className: 'fighter-preview__info' });
    fighterInfo.innerText = `Name: ${fighter.name}\nHealth: ${fighter.health}\nAttack: ${fighter.attack}\nDefense: ${fighter.defense}`;

    fighterElement.appendChild(fighterImage);
    fighterElement.appendChild(fighterInfo);
  }

  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = {
    src: source,
    title: name,
    alt: name
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes
  });

  return imgElement;
}
