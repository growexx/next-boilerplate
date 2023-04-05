import React from 'react'
import parse from 'html-react-parser'

import features from 'docs/general/features.md'
import { StyledFeaturePage } from './StyledFeatures'

const FeaturePage = () => <StyledFeaturePage>{parse(`${features}`)}</StyledFeaturePage>

export default FeaturePage
