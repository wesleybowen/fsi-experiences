import { ApplicantFetcher } from '@fsi-pcf/onboarding-application-common/Applicant';
import { FinancialCategoryFetcher } from '@fsi-pcf/onboarding-application-common/FinancialCategory';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import AssetsAndLiabilitiesSummaryWidget from '@fsi/onboarding-application/components/AssetsAndLiabilities/AssetsAndLiabilitiesSummaryWidget/AssetsAndLiabilitiesSummaryWidget';
import { ASSETS_AND_LIABILITIES } from '@fsi/onboarding-application/constants/namespaces.const';
import { FINANCIAL_CATEGORY_TYPES } from '@fsi/onboarding-application/interfaces/IFinancialCategory';
import { PCFContainer, PCFContainerProps } from '@fsi/pcf-common/dist/containers/PCFContainer';
import React from 'react';
import { usePCFLoggerService } from '@fsi/pcf-common/hooks/usePCFLoggerService';

const AssetsAndLiabilitiesWidgetContainer: React.FC<PCFContainerProps> = props => {
    const { context } = props;
    const loggerService = usePCFLoggerService();
    const translate = useTranslation();
    if (!context.parameters.applicantId) {
        return <div>{translate('MISSING_APPLICANT_INFO')}</div>;
    }
    const assetFetcher = new FinancialCategoryFetcher(context, FINANCIAL_CATEGORY_TYPES.ASSET, loggerService);
    const liabilityFetcher = new FinancialCategoryFetcher(context, FINANCIAL_CATEGORY_TYPES.LIABILITY, loggerService);
    const applicantFetcher = new ApplicantFetcher(context, loggerService);

    return (
        <PCFContainer context={context}>
            <AssetsAndLiabilitiesSummaryWidget
                financialCategoryFetchers={[assetFetcher, liabilityFetcher]}
                applicantFetcher={applicantFetcher}
                applicantId={context.parameters.applicantId.raw}
                financialItemsType={ASSETS_AND_LIABILITIES}
            />
        </PCFContainer>
    );
};

export default AssetsAndLiabilitiesWidgetContainer;
