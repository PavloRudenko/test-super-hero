import { IFormGroup } from '../../entities/formGroup.types'

export const formGroups: IFormGroup[] = [
  {
    controlId: 'nickname',
    placeholder: 'Nickname',
    labelText: 'Nickname',
    required: true,
  },
  {
    controlId: 'realName',
    placeholder: 'Real name',
    labelText: 'Real name',
    required: true,
  },
  {
    controlId: 'originDescription',
    placeholder: 'Origin description',
    labelText: 'Origin description',
  },
  {
    controlId: 'superpowers',
    placeholder: 'Superpowers',
    labelText: 'Superpowers',
    required: true,
  },
  {
    controlId: 'catchPhrase',
    placeholder: 'Catch phrase',
    labelText: 'Catch phrase',
  },
  {
    controlId: 'images',
    placeholder: 'Images',
    labelText: 'Images',
    type: 'file',
    multiple: true,
    accept: 'image/*',
    required: true,
  },
]
